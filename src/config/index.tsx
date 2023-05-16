import { BIG_TEN } from 'utils/bigNumber'
import { parseUnits } from 'ethers/lib/utils'

export const INFURA_ID = 'PkSg__OS-7f9zA6VGKy5UDEx1V28aD5-'
export const RPC_URL = 'https://bsc-dataseed1.ninicoin.io'
export const CHAIN = 56

export const NFT_IPFS = 'https://newgate.mypinata.cloud/ipfs/Qma3pitoFVPR8AvP2UepPjvn6wLwG6q4KioV1ULQ5sHRcA/'

export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18)
export const DEFAULT_GAS_LIMIT = 200000


export enum GAS_PRICE {
  default = '5',
  fast = '6',
  instant = '7',
  testnet = '10',
}

export const GAS_PRICE_GWEI = {
  default: parseUnits(GAS_PRICE.default, 'gwei').toString(),
  fast: parseUnits(GAS_PRICE.fast, 'gwei').toString(),
  instant: parseUnits(GAS_PRICE.instant, 'gwei').toString(),
  testnet: parseUnits(GAS_PRICE.testnet, 'gwei').toString(),
}

export const TOKEN_ADDRESS = '0x8Ebb4B2A4BE2aC3d542Fb2927D957e9795E4165b'
export const STAKING_ADDRESS = '0x9Ad18A739E9061641cFd251C7a1681E3Eb7222E8'
export const MULTICALL_ADDRESS = '0xfF6FD90A470Aaa0c1B8A54681746b07AcdFedc9B'

// export default config