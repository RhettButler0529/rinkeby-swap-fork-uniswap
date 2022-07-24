import { Currency, CurrencyAmount, TradeType } from '@uniswap/sdk-core'
import { DEFAULT_SLIPPAGE, Slippage } from 'lib/hooks/useSlippage'
import { PriceImpact } from 'lib/hooks/useUSDCPriceImpact'
import { Field } from 'lib/state/swap'
import { createContext, useContext } from 'react'
import { InterfaceTrade, TradeState } from 'state/routing/types'

import { INVALID_TRADE } from './useBestTrade'

interface SwapField {
  currency?: Currency
  amount?: CurrencyAmount<Currency>
  balance?: CurrencyAmount<Currency>
  usdc?: CurrencyAmount<Currency>
}

interface SwapInfo {
  [Field.INPUT]: SwapField
  [Field.OUTPUT]: SwapField
  trade: {
    trade?: InterfaceTrade<Currency, Currency, TradeType>
    state: TradeState
  }
  slippage: Slippage
  impact?: PriceImpact
}

const DEFAULT_SWAP_INFO: SwapInfo = {
  [Field.INPUT]: {},
  [Field.OUTPUT]: {},
  trade: INVALID_TRADE,
  slippage: DEFAULT_SLIPPAGE,
}

const SwapInfoContext = createContext(DEFAULT_SWAP_INFO)

/** Requires that SwapInfoUpdater be installed in the DOM tree. **/
export default function useSwapInfo(): SwapInfo {
  return useContext(SwapInfoContext)
}
