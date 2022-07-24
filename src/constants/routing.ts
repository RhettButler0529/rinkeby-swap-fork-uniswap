// a list of tokens by chain
import { Currency, Token } from '@uniswap/sdk-core'

import { SupportedChainId } from './chains'
import { nativeOnChain, WRAPPED_NATIVE_CURRENCY } from './tokens'

type ChainTokenList = {
  readonly [chainId: number]: Token[]
}

type ChainCurrencyList = {
  readonly [chainId: number]: Currency[]
}

const WRAPPED_NATIVE_CURRENCIES_ONLY: ChainTokenList = Object.fromEntries(
  Object.entries(WRAPPED_NATIVE_CURRENCY)
    .map(([key, value]) => [key, [value]])
    .filter(Boolean)
)

/**
 * Shows up in the currency select for swap and add liquidity
 */
export const COMMON_BASES: ChainCurrencyList = {
  [SupportedChainId.RINKEBY]: [
    nativeOnChain(SupportedChainId.RINKEBY),
    WRAPPED_NATIVE_CURRENCY[SupportedChainId.RINKEBY] as Token,
  ],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WRAPPED_NATIVE_CURRENCIES_ONLY,
}
export const PINNED_PAIRS: { readonly [chainId: number]: [Token, Token][] } = {}
