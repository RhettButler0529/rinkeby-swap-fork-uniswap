import { BigNumber } from '@ethersproject/bignumber'
import { useMemo } from 'react'
import { useAppSelector } from 'state/hooks'

import useCurrentBlockTimestamp from './useCurrentBlockTimestamp'

export default function useTransactionDeadline(): BigNumber | undefined {
  const ttl = useAppSelector((state) => state.user.userDeadline)
  const blockTimestamp = useCurrentBlockTimestamp()
  return useMemo(() => {
    if (blockTimestamp && ttl) return blockTimestamp.add(ttl)
    return undefined
  }, [blockTimestamp, ttl])
}
