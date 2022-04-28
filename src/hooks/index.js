import { ethers } from "ethers";
import { useContractCall } from "@usedapp/core";
import nftabi from "../abis/NFT.json";
import { nftaddress as address, stakingaddress } from "../contracts";

const nftInterface = new ethers.utils.Interface(nftabi);

export function useBalanceOf(ownerAddress) {
  const [balanceOf] =
    useContractCall({
      abi: nftInterface,
      address: address,
      method: "balanceOf",
      args: [ownerAddress],
    }) ?? [];
  const formatedBalanceof = balanceOf ? balanceOf.toNumber() : 0;
  return formatedBalanceof;
}

export function useIsApprovedForAll(ownerAddress) {
  const [isApprovedForAll] =
    useContractCall({
      abi: nftInterface,
      address: address,
      method: "isApprovedForAll",
      args: [ownerAddress, stakingaddress],
    }) ?? [];
  return isApprovedForAll;
}
