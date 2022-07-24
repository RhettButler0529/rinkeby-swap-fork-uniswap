import { Percent } from '@uniswap/sdk-core'
import { DEFAULT_AUTO_SLIPPAGE } from 'hooks/useAutoSlippageTolerance'

export function toPercent(maxSlippage: number | undefined): Percent | undefined {
  if (!maxSlippage) return undefined
  const numerator = Math.floor(maxSlippage * 100)
  return new Percent(numerator, 10_000)
}

export interface Slippage {
  auto: boolean
  allowed: Percent
  warning?: 'warning' | 'error'
}

export const DEFAULT_SLIPPAGE = { auto: true, allowed: DEFAULT_AUTO_SLIPPAGE }

export const MAX_VALID_SLIPPAGE = new Percent(1, 2)
export const MIN_HIGH_SLIPPAGE = new Percent(1, 100)

export function getSlippageWarning(slippage?: Percent): 'warning' | 'error' | undefined {
  if (slippage?.greaterThan(MAX_VALID_SLIPPAGE)) return 'error'
  if (slippage?.greaterThan(MIN_HIGH_SLIPPAGE)) return 'warning'
  return
}
