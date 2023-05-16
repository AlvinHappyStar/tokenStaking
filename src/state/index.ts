import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import stakingReducer from './staking'

export const store = configureStore({
  reducer: {
    staking: stakingReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>