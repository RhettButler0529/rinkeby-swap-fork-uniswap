import { Connector } from '@web3-react/types'
import { AbstractConnector } from 'web3-react-abstract-connector'

import { injected } from '../../connectors'
import Identicon from '../Identicon'

export default function StatusIcon({ connector }: { connector: AbstractConnector | Connector }) {
  switch (connector) {
    case injected:
      return <Identicon />
    default:
      return null
  }
}
