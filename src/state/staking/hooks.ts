import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state/hooks'
import { useFastFresh } from 'hooks/useRefresh'
import { fetchStakingDataSync, updateApprovalStatus, updateStakingDataWithEmpty } from '.'
import { fetchApprovalStatus } from './fetchStaking'

export const useStakingData = (_poolNumber: number, _account: string | undefined) => {
  const dispatch = useAppDispatch()
  const fastRefresh = useFastFresh()

  useEffect(() => {
    if (_account) {
      dispatch(fetchStakingDataSync({ poolNumber: _poolNumber, account: _account }))
    } else {
      dispatch(updateStakingDataWithEmpty())
    }
  }, [_account, fastRefresh, dispatch])
}

export const useBalances = () => {
  const totalStakedBalance = useSelector((state: any) => state.staking.totalStakedBalance)
  const stakedAmount = useSelector((state: any) => state.staking.stakedAmount)
  const walletBalance = useSelector((state: any) => state.staking.walletBalance)
  const pendingReward = useSelector((state: any) => state.staking.pendingReward)

  return { totalStakedBalance, stakedAmount, walletBalance, pendingReward }
}

export const useTokenApprovalStatus = () => {
  const tokenStatus = useSelector((state: any) => state.staking.tokenStatus)
  return tokenStatus
}

export const useApprovalStatus = (_account: string | undefined, _changed: boolean) => {
  const dispatch = useAppDispatch()
  const fastRefresh = useFastFresh()

  
  useEffect(() => {
    const fetchApprove = async (_account: string) => {
      const status = await fetchApprovalStatus(_account)
      dispatch(updateApprovalStatus({tokenStatus: status}))
    }
    if (_account) {
      fetchApprove(_account)
    }
  }, [_account, _changed, fastRefresh, dispatch])
}