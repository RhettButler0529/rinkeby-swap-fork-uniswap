import useActiveWeb3React from 'hooks/useActiveWeb3React'
import LibUpdater from 'lib/hooks/transactions/updater'
import { useCallback, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from 'state/hooks'

import { checkedTransaction, finalizeTransaction } from './actions'

export default function Updater() {
  const { chainId } = useActiveWeb3React()
  // speed up popup dismisall time if on L2

  const dispatch = useAppDispatch()
  const onCheck = useCallback(
    ({ chainId, hash, blockNumber }) => dispatch(checkedTransaction({ chainId, hash, blockNumber })),
    [dispatch]
  )
  const onReceipt = useCallback(
    ({ chainId, hash, receipt }) => {
      dispatch(
        finalizeTransaction({
          chainId,
          hash,
          receipt: {
            blockHash: receipt.blockHash,
            blockNumber: receipt.blockNumber,
            contractAddress: receipt.contractAddress,
            from: receipt.from,
            status: receipt.status,
            to: receipt.to,
            transactionHash: receipt.transactionHash,
            transactionIndex: receipt.transactionIndex,
          },
        })
      )
    },
    [dispatch]
  )

  const state = useAppSelector((state) => state.transactions)
  const pendingTransactions = useMemo(() => (chainId ? state[chainId] ?? {} : {}), [chainId, state])

  return <LibUpdater pendingTransactions={pendingTransactions} onCheck={onCheck} onReceipt={onReceipt} />
}
