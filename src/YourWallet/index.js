import React, { useState, useEffect } from "react";
import { useEthers, useEtherBalance, useTokenBalance } from "@usedapp/core";
import { formatUnits } from "@ethersproject/units";
import { Button } from "../globalStyles";
import styled from "styled-components";
import { ethers } from "ethers";
import { stakingaddress, tokenaddress } from "../contracts";
import stakingabi from "../abis/Staking.json";

const stakingInterface = new ethers.utils.Interface(stakingabi);

const WalletContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
  @media and screen (max-width: 768px) {
    flex-direction: cloumn;
  }
`;

const YourWallet = (props) => {
  const { account } = useEthers();
  const userBalance = useTokenBalance(tokenaddress, account);

  const formattedTokenBalance = userBalance
    ? parseFloat(formatUnits(userBalance, 18))
    : 0;

  const claimToken = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      stakingaddress,
      stakingInterface,
      signer
    );

    const tokens = await contract.tokensOfOwner(account);

    try {
      const transaction = await contract.claim(tokens);
      await transaction.wait();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <WalletContainer>
      <Button onClick={() => claimToken()}>Claim $MEST</Button>
      <Button style={{ background: "green" }}>
        Balance: <span>{formattedTokenBalance.toFixed(4)}</span> $MEST
      </Button>
    </WalletContainer>
  );
};

export default YourWallet;
