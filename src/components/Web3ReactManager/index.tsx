import { Trans } from '@lingui/macro'
import styled from 'styled-components/macro'
import { useWeb3React } from 'web3-react-core'

import { NetworkContextName } from '../../constants/misc'
import { useEagerConnect, useInactiveListener } from '../../hooks/web3'

const MessageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20rem;
`

const Message = styled.h2`
  color: ${({ theme }) => theme.secondary1};
`

export default function Web3ReactManager({ children }: { children: JSX.Element }) {
  const { active } = useWeb3React()
  const { error: networkError } = useWeb3React(NetworkContextName)

  // try to eagerly connect to an injected provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
  useInactiveListener(!triedEager)

  // if the account context isn't active, and there's an error on the network context, it's an irrecoverable error
  if (triedEager && !active && networkError) {
    return (
      <MessageWrapper>
        <Message>
          <Trans>
            Oops! An unknown error occurred. Please refresh the page, or visit from another browser or device.
          </Trans>
        </Message>
      </MessageWrapper>
    )
  }

  return children
}
