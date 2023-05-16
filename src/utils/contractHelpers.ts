import { ethers } from 'ethers'
import Web3 from 'web3'
import { simpleRpcProvider } from 'utils/providers'

// Addresses
import {
  getTokenAddress,
  getStakingAddress,
  getRewardAddress,
  getMulticallAddress,
} from 'utils/addressHelpers'

// ABI
import ERC20 from 'config/abis/erc20.json'
import MultiCallAbi from 'config/abis/multicall.json'
import Staking from 'config/abis/staking.json'

const getContract = (abi: any, address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider
  return new ethers.Contract(address, abi, signerOrProvider)
}

export function getContractWithWeb3(abi: any, address: string, provider: any) {
  const web3 = new Web3(provider)
  return new web3.eth.Contract(abi, address)
}

export const getTokenContract = (provider: any) => {
  return getContractWithWeb3(ERC20, getTokenAddress(), provider)
}

export const getStakingContract = (provider: any) => {
  return getContractWithWeb3(Staking, getStakingAddress(), provider)
}

export const getMulticallContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(MultiCallAbi, getMulticallAddress(), signer) as any
}