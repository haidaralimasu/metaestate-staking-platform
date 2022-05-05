import React, { useState, useEffect } from "react";
import logo from "../../images/hero.jpg";
import {
  ServicesWrapper,
  ServicesCard,
  ServicesIcon,
  ServicesH2,
  ServicesP,
} from "./BuyItemElements.js";
import { notifyError, notifySuccess } from "../../helpers";
import axios from "axios";
import { ethers } from "ethers";
import { Button } from "../../globalStyles";
import { nftaddress, stakingaddress } from "../../contracts";
import nftabi from "../../abis/NFT.json";
import stakingabi from "../../abis/Staking.json";
import { useEthers } from "@usedapp/core";

import { useIsApprovedForAll } from "../../hooks";

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

    const contract = new ethers.Contract(nftaddress, nftInterface, signer);
    const data = await contract.walletOfOwner(account);
    console.log(signer);

    const items = await Promise.all(
      data.map(async (i) => {
        const j = i.toNumber();
        console.log(j);
        const tokenUri = await contract.tokenURI(j);
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
          nftInterface,
          signer
        );
        const approvaltx = await nftContract.setApprovalForAll(
          stakingaddress,
          true
        );
        await approvaltx.wait();
        await notifySuccess("Approval Succed Please approve next transaction!");
      }
      const transaction = await contract.stake(tokenId);
      await transaction.wait();
      await notifySuccess("Staked nft successfully !!");
    } catch (error) {
      console.log(error);
      await notifyError("Something went wrong !!");
    }
  };

  return (
    <ServicesWrapper>
      {nfts.map((nft, i) => (
        <ServicesCard>
          {/* <ServicesIcon src="https://images.unsplash.com/photo-1650971831044-ccf2ac979a92?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" /> */}
          <ServicesIcon src={logo} />

          <ServicesH2>{nft.name}</ServicesH2>

          <Button
            onClick={() => stakeNft([nft.tokenId])}
            style={{ margin: "20px" }}
          >
            Stake
          </Button>
        </ServicesCard>
      ))}
    </ServicesWrapper>
  );
};

export default BuyItem;
