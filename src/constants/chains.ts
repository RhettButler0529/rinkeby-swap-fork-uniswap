/**
 * List of all the networks supported by the Uniswap Interface
 */
export enum SupportedChainId {
  RINKEBY = 4,
}

export const CHAIN_IDS_TO_NAMES = {
  [SupportedChainId.RINKEBY]: 'rinkeby',
}

/**
 * Array of all the supported chain IDs
 */
export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(SupportedChainId).filter(
  (id) => typeof id === 'number'
) as SupportedChainId[]

/**
 * All the chain IDs that are running the Ethereum protocol.
 */
export const L1_CHAIN_IDS = [SupportedChainId.RINKEBY] as const

export type SupportedL1ChainId = typeof L1_CHAIN_IDS[number]
