import React, { useState, useEffect } from "react";
import {
  ServicesWrapper,
  ServicesCard,
  ServicesIcon,
  ServicesH2,
  ServicesP,
} from "../../BuyItem/BuyItemElements";
import axios from "axios";
import { ethers } from "ethers";
import { Button } from "../../../globalStyles";
import { nftaddress, stakingaddress } from "../../../contracts";
import { notifyError, notifySuccess } from "../../../helpers";

import nftabi from "../../../abis/NFT.json";
import stakingabi from "../../../abis/Staking.json";
import { useEthers } from "@usedapp/core";

import { useIsApprovedForAll } from "../../../hooks";

const nftInterface = new ethers.utils.Interface(nftabi);
const stakingInterface = new ethers.utils.Interface(stakingabi);

const BuyItem = (props) => {
  const { account } = useEthers();
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    loadNFTs();
  }, []);

  const isApprovedForAll = useIsApprovedForAll(account);

  async function loadNFTs() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      stakingaddress,
      stakingInterface,
      signer
    );

    const data = await contract.tokensOfOwner(account);
    console.log(signer);

    const nftContract = new ethers.Contract(nftaddress, nftInterface, signer);

    const items = await Promise.all(
      data.map(async (i) => {
        const j = i.toNumber();
        console.log(j);
        const tokenUri = await nftContract.tokenURI(j);
        console.log(tokenUri);
        const meta = await axios.get(tokenUri);

        console.log(meta.data.image);
        console.log(meta.data.image);
        let item = {
          tokenId: j,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );

    setNfts(items);
    setLoadingState("loaded");
  }

  const stakeNft = async (tokenId) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      stakingaddress,
      stakingInterface,
      signer
    );

    try {
      if (!isApprovedForAll) {
        const nftContract = new ethers.Contract(
          nftaddress,
          stakingInterface,
          signer
        );
        const approvaltx = await nftContract.setApprovalForAll(
          stakingaddress,
          true
        );
        await approvaltx.wait();
        await notifySuccess("Unstaked Succesfully !!");
      }
      const transaction = await contract.unstake(tokenId);
      await transaction.wait();
    } catch (error) {
      console.log(error);
      notifyError("Something went wrong !!");
    }
  };

  return (
    <ServicesWrapper>
      {nfts.map((nft, i) => (
        <ServicesCard>
          <ServicesIcon src={nft.image} />
          <ServicesH2>{nft.name}</ServicesH2>

          <Button
            onClick={() => stakeNft([nft.tokenId])}
            style={{ margin: "20px" }}
          >
            Un Stake
          </Button>
        </ServicesCard>
      ))}
    </ServicesWrapper>
  );
};

export default BuyItem;
