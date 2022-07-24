import { Trans } from '@lingui/macro'
import styled from 'styled-components/macro'

import { ThemedText } from '../../theme'
import { RowBetween, RowFixed } from '../Row'

const StyledSwapHeader = styled.div`
  padding: 1rem 1.25rem 0.5rem 1.25rem;
  width: 100%;
  color: ${({ theme }) => theme.text2};
`

export default function SwapHeader() {
  return (
    <StyledSwapHeader>
      <RowBetween>
        <RowFixed>
          <ThemedText.Black fontWeight={500} fontSize={16} style={{ marginRight: '8px' }}>
            <Trans>Swap</Trans>
          </ThemedText.Black>
        </RowFixed>
      </RowBetween>
    </StyledSwapHeader>
  )
}
