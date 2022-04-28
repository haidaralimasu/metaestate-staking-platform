import React,{ useEffect, useState } from 'react';
import {
	CreateItemsSection,
	CreateItemsWrapper,
	CreateItemsHeading,
  FormInput,
  FormTextArea,
  MintButton
} from './CreateItemsElements'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useHistory } from 'react-router-dom';
import {
  nftaddress, nftmarketaddress
} from '../../constants/polygon'
import NFT from '../../abi/polygon/NFT.json'
import Market from '../../abi/polygon/NFTMarket.json'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const projectId = '21XbUTxQd3BjlYJq9zjmy0czKgr'
const projectSecret = 'cac4c8208574e13819906decb0299b42'
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')

const client = ipfsHttpClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
    "Access-Control-Allow-Origin": "*"
  }
})

client.pin.add('QmeGAVddnBSnKc1DLE7DLV9uuTqo5F7QbaveTjr45JUdQn').then((res) => {
  console.log(res)
})


const CreateItems = (props) => {

  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
    useEffect(() => {
      setFileUrl(null);
      updateFormInput({ price: '', name: '', description: '' });
    }, []);
  const router = useHistory()

const notifyError = () => toast.error('🦄 Something Went Wrong!', {
position: "top-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});;

const notifyCreateMarket = () => toast.success('🦄 Item Listed Succesfully!', {
position: "top-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});

const notifyFees = () => toast.info('🦄 Transaction Succed Wait for other transaction!', {
position: "top-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});

async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }
  async function createMarket() {
    const { name, description, price } = formInput
    if (!name || !description || !price || !fileUrl) return
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name, description, image: fileUrl
    })
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      await createSale(url)
      notifyCreateMarket()
      
    } catch (error) {
      notifyError()
      console.log('Error uploading file: ', error)
    }  
  }

  async function createSale(url) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)    
    const signer = provider.getSigner()
    
    /* next, create the item */
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
    let transaction = await contract.createToken(url)
    let tx = await transaction.wait()
    notifyFees()
    let event = tx.events[0]
    let value = event.args[2]
    let tokenId = value.toNumber()

    const price = ethers.utils.parseUnits(formInput.price, 'ether')
  
    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()

    transaction = await contract.createMarketItem(nftaddress, tokenId, price, { value: listingPrice })
    await transaction.wait()
    router.push('/profile')
  }

  return (
    <>
    <CreateItemsSection>
<ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>

<ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
    <CreateItemsWrapper>
    <CreateItemsHeading>List an Item</CreateItemsHeading>
    <FormInput  onChange={e => updateFormInput({ ...formInput, name: e.target.value })} name='name' type='name' placeholder='Name of Item' />
    <FormTextArea onChange={e => updateFormInput({ ...formInput, description: e.target.value })} placeholder='Description for Item' />
    <FormInput onChange={e => updateFormInput({ ...formInput, price: e.target.value })}  name='price' type='number' placeholder='Price of Item in Matic'/>
    <FormInput onChange={onChange} type='file' style />
    <div>
      {
        fileUrl && (
          <img style={{margin:"20px"}} width="350px" height="350px"  alt="uploaded img" src={fileUrl} />
        )
      }
    </div>
    <MintButton onClick={createMarket} >Mint</MintButton>
    </CreateItemsWrapper>
    </CreateItemsSection>
    </>
  )
}

export default CreateItems;