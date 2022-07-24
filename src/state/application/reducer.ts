import { createSlice } from '@reduxjs/toolkit'

import { SupportedChainId } from '../../constants/chains'

export type PopupContent =
  | {
      txn: {
        hash: string
      }
    }
  | {
      failedSwitchNetwork: SupportedChainId
    }

export enum ApplicationModal {
  ADDRESS_CLAIM,
  BLOCKED_ACCOUNT,
  DELEGATE,
  CLAIM_POPUP,
  MENU,
  NETWORK_SELECTOR,
  POOL_OVERVIEW_OPTIONS,
  PRIVACY_POLICY,
  SELF_CLAIM,
  SETTINGS,
  VOTE,
  WALLET,
}

type PopupList = Array<{ key: string; show: boolean; content: PopupContent; removeAfterMs: number | null }>

export interface ApplicationState {
  readonly chainId: number | null
  readonly openModal: ApplicationModal | null
  readonly popupList: PopupList
}

const initialState: ApplicationState = {
  chainId: null,
  openModal: null,
  popupList: [],
}

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    updateChainId(state, action) {
      const { chainId } = action.payload
      state.chainId = chainId
    },
    setOpenModal(state, action) {
      state.openModal = action.payload
    },
  },
})

export const { updateChainId, setOpenModal } = applicationSlice.actions
export default applicationSlice.reducer
