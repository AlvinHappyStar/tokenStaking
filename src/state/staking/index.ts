import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'state'
import { fetchTotalStakedBalance, fetchStakedAmount, fetchStakingTokenBalances, fetchPendingReward } from './fetchStaking'

interface StakingDataResponse {
  totalStakedBalance: string,
  stakedAmount: string,
  walletBalance: string,
  pendingReward: string,
}

const initialState = {
  totalStakedBalance: '0',
  stakedAmount: '0',
  walletBalance: '0',
  pendingReward: '0',
  tokenStatus: false,
  status: 'idle',
};

export const fetchStakingDataSync = createAsyncThunk<StakingDataResponse, {poolNumber: number, account: string}, {state: RootState}>(
  'staking/fetchStakingData',
  async ({ poolNumber, account }) => {
    const totalStakedBalance = await fetchTotalStakedBalance()
    const stakedAmount = await fetchStakedAmount(poolNumber, account)
    const walletBalance = await fetchStakingTokenBalances(account)
    const pendingReward = await fetchPendingReward(poolNumber, account)
    return {
      totalStakedBalance,
      stakedAmount,
      walletBalance,
      pendingReward,
    }
  }
)

export const stakingSlice = createSlice({
  name: 'staking',
  initialState,
  reducers: {
    updateApprovalStatus: (state, action) => {
      state.tokenStatus = action.payload.tokenStatus
    },
    updateStakingDataWithEmpty: (state) => {
      state.status = 'loading'
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStakingDataSync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchStakingDataSync.fulfilled, (state, action) => {
        state.totalStakedBalance = action.payload.totalStakedBalance
        state.stakedAmount = action.payload.stakedAmount
        state.walletBalance = action.payload.walletBalance
        state.pendingReward = action.payload.pendingReward
        state.status = 'idle'
      })
      .addCase(fetchStakingDataSync.rejected, (state) => {
        state.status = 'failed'
      })
  }
});

export const { updateApprovalStatus, updateStakingDataWithEmpty } = stakingSlice.actions

export default stakingSlice.reducer;
