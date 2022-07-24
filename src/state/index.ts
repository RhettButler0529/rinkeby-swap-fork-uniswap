import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import multicall from 'lib/state/multicall'
import { load } from 'redux-localstorage-simple'

import application from './application/reducer'
import { updateVersion } from './global/actions'
import lists from './lists/reducer'
import { routingApi } from './routing/slice'
import swap from './swap/reducer'
import transactions from './transactions/reducer'
import user from './user/reducer'

const PERSISTED_KEYS: string[] = ['user', 'transactions', 'lists']

const store = configureStore({
  reducer: {
    application,
    user,
    transactions,
    swap,
    multicall: multicall.reducer,
    lists,
    [routingApi.reducerPath]: routingApi.reducer,
  },
  preloadedState: load({ states: PERSISTED_KEYS, disableWarnings: process.env.NODE_ENV === 'test' }),
})

store.dispatch(updateVersion())

setupListeners(store.dispatch)

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
