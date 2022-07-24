import { FACTORY_ADDRESS as V2_FACTORY_ADDRESS } from '@uniswap/v2-sdk'

import { constructSameAddressMap } from '../utils/constructSameAddressMap'
import { SupportedChainId } from './chains'

type AddressMap = { [chainId: number]: string }

export const UNI_ADDRESS: AddressMap = constructSameAddressMap('0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984')
export const MULTICALL_ADDRESS: AddressMap = {
  ...constructSameAddressMap('0x1F98415757620B543A52E61c46B32eB19261F984', []),
}
export const V2_FACTORY_ADDRESSES: AddressMap = constructSameAddressMap(V2_FACTORY_ADDRESS)

export const V2_ROUTER_ADDRESS: AddressMap = constructSameAddressMap('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D')
export const V3_ROUTER_ADDRESS: AddressMap = constructSameAddressMap('0xE592427A0AEce92De3Edee1F18E0157C05861564', [])
export const SWAP_ROUTER_ADDRESSES: AddressMap = constructSameAddressMap(
  '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45',
  []
)

export const QUOTER_ADDRESSES: AddressMap = constructSameAddressMap('0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6', [])
export const ENS_REGISTRAR_ADDRESSES: AddressMap = {
  [SupportedChainId.RINKEBY]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
}

export const V3_MIGRATOR_ADDRESSES: AddressMap = constructSameAddressMap(
  '0xA5644E29708357803b5A882D272c41cC0dF92B34',
  []
)
