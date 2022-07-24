import { Currency, Ether, NativeCurrency, Token, WETH9 } from '@uniswap/sdk-core'
import invariant from 'tiny-invariant'

import { UNI_ADDRESS } from './addresses'
import { SupportedChainId } from './chains'

export const USDC_RINKEBY = new Token(
  SupportedChainId.RINKEBY,
  '0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b',
  6,
  'tUSDC',
  'test USD//C'
)

export const USDC: { [chainId in SupportedChainId]: Token } = {
  [SupportedChainId.RINKEBY]: USDC_RINKEBY,
}

export const UNI: { [chainId: number]: Token } = {
  [SupportedChainId.RINKEBY]: new Token(SupportedChainId.RINKEBY, UNI_ADDRESS[4], 18, 'UNI', 'Uniswap'),
}

export const WRAPPED_NATIVE_CURRENCY: { [chainId: number]: Token | undefined } = {
  ...(WETH9 as Record<SupportedChainId, Token>),
}

function isMatic(chainId: number) {
  return false
}

class MaticNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }

  get wrapped(): Token {
    if (!isMatic(this.chainId)) throw new Error('Not matic')
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId]
    invariant(wrapped instanceof Token)
    return wrapped
  }

  public constructor(chainId: number) {
    if (!isMatic(chainId)) throw new Error('Not matic')
    super(chainId, 18, 'MATIC', 'Polygon Matic')
  }
}

export class ExtendedEther extends Ether {
  public get wrapped(): Token {
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId]
    if (wrapped) return wrapped
    throw new Error('Unsupported chain ID')
  }

  private static _cachedExtendedEther: { [chainId: number]: NativeCurrency } = {}

  public static onChain(chainId: number): ExtendedEther {
    return this._cachedExtendedEther[chainId] ?? (this._cachedExtendedEther[chainId] = new ExtendedEther(chainId))
  }
}

const cachedNativeCurrency: { [chainId: number]: NativeCurrency } = {}
export function nativeOnChain(chainId: number): NativeCurrency {
  return (
    cachedNativeCurrency[chainId] ??
    (cachedNativeCurrency[chainId] = isMatic(chainId)
      ? new MaticNativeCurrency(chainId)
      : ExtendedEther.onChain(chainId))
  )
}

export const TOKEN_SHORTHANDS: { [shorthand: string]: { [chainId in SupportedChainId]?: string } } = {
  USDC: {
    [SupportedChainId.RINKEBY]: USDC_RINKEBY.address,
  },
}
