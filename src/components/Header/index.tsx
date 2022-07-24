import { Trans } from '@lingui/macro'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Text } from 'rebass'
import { useNativeCurrencyBalances } from 'state/wallet/hooks'
import styled from 'styled-components/macro'

import Web3Status from '../Web3Status'

const HeaderFrame = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: relative;
  padding: 1rem;
  z-index: 21;
  position: relative;
  /* Background slide effect on scroll. */
  background-image: ${({ theme }) => `linear-gradient(to bottom, transparent 50%, ${theme.bg0} 50% )}}`};
  background-size: 100% 200%;
  box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.bg2};
  transition: background-position 0.1s, box-shadow 0.1s;
  background-blend-mode: hard-light;
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;
`

const AccountElement = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.bg0};
  border-radius: 16px;
  white-space: nowrap;
  width: 100%;
  height: 40px;

  :focus {
    border: 1px solid blue;
  }
`

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

export default function Header() {
  const { account } = useActiveWeb3React()

  const userEthBalance = useNativeCurrencyBalances(account ? [account] : [])?.[account ?? '']

  return (
    <HeaderFrame>
      <HeaderControls>
        <AccountElement>
          {account && userEthBalance ? (
            <BalanceText style={{ flexShrink: 0, userSelect: 'none' }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
              <Trans>{userEthBalance?.toSignificant(3)} rETH</Trans>
            </BalanceText>
          ) : null}
          <Web3Status />
        </AccountElement>
      </HeaderControls>
    </HeaderFrame>
  )
}
