import { CurrencyAmount, Token } from '@uniswap/sdk-core'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTokenBalances } from 'lib/hooks/useCurrencyBalance'
import { useMemo } from 'react'

import { useAllTokens } from '../../hooks/Tokens'

export {
  default as useCurrencyBalance,
  useCurrencyBalances,
  useNativeCurrencyBalances,
  useTokenBalance,
  useTokenBalances,
  useTokenBalancesWithLoadingIndicator,
} from 'lib/hooks/useCurrencyBalance'

// mimics useAllBalances
export function useAllTokenBalances(): { [tokenAddress: string]: CurrencyAmount<Token> | undefined } {
  const { account } = useActiveWeb3React()
  const allTokens = useAllTokens()
  const allTokensArray = useMemo(() => Object.values(allTokens ?? {}), [allTokens])
  const balances = useTokenBalances(account ?? undefined, allTokensArray)
  return balances ?? {}
}
