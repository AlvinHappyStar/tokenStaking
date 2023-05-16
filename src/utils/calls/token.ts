import { getTokenContract } from '../contractHelpers'
import { getStakingAddress } from '../addressHelpers'
import BigNumber from 'bignumber.js'
import { DEFAULT_TOKEN_DECIMAL } from 'config'

export const callApproveForAmount = (provider: any, address: string, amount: number) => {
  const tokenContract = getTokenContract(provider)
  const stakingAddress = getStakingAddress()
  const bigAmount = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString();

  return new Promise(async(resolve, reject) => {
    await tokenContract.methods
      .approve(stakingAddress, bigAmount)
      .send({ from: address }, (err: any, data: any) => {
        if (err) {
          reject(err)
        }
        resolve(data)
      })
  })
}

