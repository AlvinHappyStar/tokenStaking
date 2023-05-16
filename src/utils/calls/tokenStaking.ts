import { getStakingContract } from '../contractHelpers'
import BigNumber from 'bignumber.js'
import { DEFAULT_TOKEN_DECIMAL } from 'config'

export const callStakeToken = (provider: any, address: string, pid: number, amount: number) => {
  const stakingContract = getStakingContract(provider)
  const bigAmount = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString();

  return new Promise(async(resolve, reject) => {
    await stakingContract.methods
      .deposit(pid, bigAmount)
      .send({ from: address }, (err: any, data: any) => {
        if (err) {
          reject(err)
        }
        resolve(data)
      })
  })
}

export const callUnstakeToken = (provider: any, address: string, pid: number) => {
  const stakingContract = getStakingContract(provider)

  return new Promise(async(resolve, reject) => {
    await stakingContract.methods
      .withdrawStakingToken(pid)
      .send({ from: address }, (err: any, data: any) => {
        if (err) {
          reject(err)
        }
        resolve(data)
      })
  })
}

export const callClaim = (provider: any, address: string, pid: number) => {
  const stakingContract = getStakingContract(provider)
  return new Promise(async(resolve, reject) => {
    await stakingContract.methods
      .withdrawRewardToken(pid)
      .send({ from: address }, (err: any, data: any) => {
        if (err) {
          reject(err)
        }
        resolve(data)
      })
  })
}