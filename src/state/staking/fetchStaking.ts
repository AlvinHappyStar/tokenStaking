import BigNumber from 'bignumber.js'
import ERC20ABI from 'config/abis/erc20.json'
import STAKINGABI from 'config/abis/staking.json'
import { getTokenAddress, getStakingAddress, getRewardAddress } from 'utils/addressHelpers'
import multicall from 'utils/multicall'

export const fetchTotalStakedBalance = async () => {
  const rewardAddress = getTokenAddress()
  const stakingAddress = getStakingAddress()
  const calls = [
    {
      address: rewardAddress,
      name: 'balanceOf',
      params: [stakingAddress],
    }
  ]

  const rawTokenBalances = await multicall(ERC20ABI, calls)
  const parsedTokenBalances = new BigNumber(rawTokenBalances[0][0]._hex).toJSON()
  return parsedTokenBalances
}

export const fetchStakedAmount = async (poolNumber: number, account: string) => {
  const stakingAddress = getStakingAddress()

  const calls = [
    {
      address: stakingAddress,
      name: 'userInfo',
      params: [poolNumber, account],
    }
  ]

  const stakedAmount = await multicall(STAKINGABI, calls)
  const parsedStakedAmount = new BigNumber(stakedAmount[0][0]._hex).toJSON()
  
  return parsedStakedAmount
}

export const fetchStakingTokenBalances = async (account: string) => {
  const stakingTokenAddress = getTokenAddress()
  const calls = [
    {
      address: stakingTokenAddress,
      name: 'balanceOf',
      params: [account],
    }
  ]

  const stakeTokenBalances = await multicall(ERC20ABI, calls)
  const parsedTokenBalances = new BigNumber(stakeTokenBalances[0][0]._hex).toJSON()

  return parsedTokenBalances
}

export const fetchPendingReward = async (poolNumber: number, account: string) => {
  const stakingTokenAddress = getStakingAddress()
  const calls = [
    {
      address: stakingTokenAddress,
      name: 'pendingReward',
      params: [poolNumber, account],
    }
  ]

  const pendingReward = await multicall(STAKINGABI, calls)
  const parsedPendingReward = new BigNumber(pendingReward[0][0]._hex).toJSON()
  
  return parsedPendingReward
}

export const fetchRewardTokenBalances = async (account: string) => {
  const rewardAddress = getTokenAddress()
  const calls = [
    {
      address: rewardAddress,
      name: 'balanceOf',
      params: [account],
    }
  ]

  const rawTokenBalances = await multicall(ERC20ABI, calls)
  const parsedTokenBalances = new BigNumber(rawTokenBalances[0][0]._hex).toJSON()

  return parsedTokenBalances
}

export const fetchApprovalStatus = async (account: string) => {
  const tokenAddress = getTokenAddress()
  const stakingAddress = getStakingAddress()

  const calls = [
    {
      address: tokenAddress,
      name: 'allowance',
      params: [account, stakingAddress],
    },
  ]

  const rawApprovalStatus = await multicall(ERC20ABI, calls)
  const parsedApprovalStatus = rawApprovalStatus.map((status: any) => {
    return status[0]
  })
  return parsedApprovalStatus
}
