import { Currency } from '@uniswap/sdk-core'
import { Pool, Route } from '@uniswap/v3-sdk'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useMemo } from 'react'

function computeAllRoutes(
  currencyIn: Currency,
  currencyOut: Currency,
  chainId: number,
  currentPath: Pool[] = [],
  allPaths: Route<Currency, Currency>[] = [],
  startCurrencyIn: Currency = currencyIn,
  maxHops = 2
): Route<Currency, Currency>[] {
  const tokenIn = currencyIn?.wrapped
  const tokenOut = currencyOut?.wrapped
  if (!tokenIn || !tokenOut) throw new Error('Missing tokenIn/tokenOut')

  return allPaths
}

/**
 * Returns all the routes from an input currency to an output currency
 * @param currencyIn the input currency
 * @param currencyOut the output currency
 */
export function useAllV3Routes(
  currencyIn?: Currency,
  currencyOut?: Currency
): { loading: boolean; routes: Route<Currency, Currency>[] } {
  const { chainId } = useActiveWeb3React()

  const poolsLoading = false

  return useMemo(() => {
    if (poolsLoading || !chainId || !currencyIn || !currencyOut) return { loading: true, routes: [] }

    const routes = computeAllRoutes(currencyIn, currencyOut, chainId, [], [], currencyIn, 2)
    return { loading: false, routes }
  }, [chainId, currencyIn, currencyOut, poolsLoading])
}
