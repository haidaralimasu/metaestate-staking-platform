import React, {useState, useEffect} from 'react';
import {
	ServicesWrapper,
	ServicesCard,
	ServicesIcon,
	ServicesH2,
	ServicesP
} from '../DashboardElements.js'
import axios from 'axios'
import { ethers } from 'ethers'
import {
  nftaddress, nftmarketaddress
} from '../../../constants/polygon'
import NFT from '../../../abi/polygon/NFT.json'
import Market from '../../../abi/polygon/NFTMarket.json'
const Solded = (props) => {

	const [sold, setSold] = useState([])
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
      
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const data = await marketContract.fetchItemsCreated()
    
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
        sold: i.sold,
      }
      return item
    }))
    /* create a filtered array of items that have been sold */
    const soldItems = items.filter(i => i.sold)
    setSold(soldItems)
  }
  return (


    <ServicesWrapper>

    {sold.map((nft, i) => (
   	<ServicesCard>
    	<ServicesIcon src={nft.image} />
    	<ServicesH2>{nft.name}</ServicesH2>
    	<ServicesP style={{marginTop: "10px"}} >{nft.description}</ServicesP>
      <ServicesP>Price: <span style={{color:"darkgreen"}}>{nft.price} MATIC</span></ServicesP>
   
    </ServicesCard>
    ))}


    </ServicesWrapper>


  )
}

export default Solded;