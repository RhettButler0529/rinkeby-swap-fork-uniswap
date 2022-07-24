import { SupportedChainId } from './chains'

const INFURA_KEY = "4bf032f2d38a4ed6bb975b80d6340847"
if (typeof INFURA_KEY === 'undefined') {
  throw new Error(`REACT_APP_INFURA_KEY must be a defined environment variable`)
}

/**
 * These are the network URLs used by the interface when there is not another available source of chain data
 */
export const INFURA_NETWORK_URLS: { [key in SupportedChainId]: string } = {
  [SupportedChainId.RINKEBY]: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
}
