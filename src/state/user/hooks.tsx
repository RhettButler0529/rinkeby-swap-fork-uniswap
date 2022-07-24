import { Percent, Token } from '@uniswap/sdk-core'
import { SupportedLocale } from 'constants/locales'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCallback, useMemo } from 'react'
import { shallowEqual } from 'react-redux'
import { useAppDispatch, useAppSelector } from 'state/hooks'

import {
  addSerializedToken,
  removeSerializedToken,
  SerializedToken,
  updateUserClientSideRouter,
  updateUserDarkMode,
  updateUserExpertMode,
  updateUserLocale,
} from './actions'

function serializeToken(token: Token): SerializedToken {
  return {
    chainId: token.chainId,
    address: token.address,
    decimals: token.decimals,
    symbol: token.symbol,
    name: token.name,
  }
}

function deserializeToken(serializedToken: SerializedToken): Token {
  return new Token(
    serializedToken.chainId,
    serializedToken.address,
    serializedToken.decimals,
    serializedToken.symbol,
    serializedToken.name
  )
}

export function useIsDarkMode(): boolean {
  const { userDarkMode, matchesDarkMode } = useAppSelector(
    ({ user: { matchesDarkMode, userDarkMode } }) => ({
      userDarkMode,
      matchesDarkMode,
    }),
    shallowEqual
  )

  return userDarkMode === null ? matchesDarkMode : userDarkMode
}

export function useDarkModeManager(): [boolean, () => void] {
  const dispatch = useAppDispatch()
  const darkMode = useIsDarkMode()

  const toggleSetDarkMode = useCallback(() => {
    dispatch(updateUserDarkMode({ userDarkMode: !darkMode }))
  }, [darkMode, dispatch])

  return [darkMode, toggleSetDarkMode]
}

export function useUserLocale(): SupportedLocale | null {
  return useAppSelector((state) => state.user.userLocale)
}

export function useUserLocaleManager(): [SupportedLocale | null, (newLocale: SupportedLocale) => void] {
  const dispatch = useAppDispatch()
  const locale = useUserLocale()

  const setLocale = useCallback(
    (newLocale: SupportedLocale) => {
      dispatch(updateUserLocale({ userLocale: newLocale }))
    },
    [dispatch]
  )

  return [locale, setLocale]
}

export function useIsExpertMode(): boolean {
  return useAppSelector((state) => state.user.userExpertMode)
}

export function useExpertModeManager(): [boolean, () => void] {
  const dispatch = useAppDispatch()
  const expertMode = useIsExpertMode()

  const toggleSetExpertMode = useCallback(() => {
    dispatch(updateUserExpertMode({ userExpertMode: !expertMode }))
  }, [expertMode, dispatch])

  return [expertMode, toggleSetExpertMode]
}

export function useClientSideRouter(): [boolean, (userClientSideRouter: boolean) => void] {
  const dispatch = useAppDispatch()

  const clientSideRouter = useAppSelector((state) => Boolean(state.user.userClientSideRouter))

  const setClientSideRouter = useCallback(
    (newClientSideRouter: boolean) => {
      dispatch(updateUserClientSideRouter({ userClientSideRouter: newClientSideRouter }))
    },
    [dispatch]
  )

  return [clientSideRouter, setClientSideRouter]
}

/**
 * Return the user's slippage tolerance, from the redux store, and a function to update the slippage tolerance
 */
export function useUserSlippageTolerance(): Percent | 'auto' {
  const userSlippageTolerance = useAppSelector((state) => {
    return state.user.userSlippageTolerance
  })

  return useMemo(
    () => (userSlippageTolerance === 'auto' ? 'auto' : new Percent(userSlippageTolerance, 10_000)),
    [userSlippageTolerance]
  )
}

/**
 * Same as above but replaces the auto with a default value
 * @param defaultSlippageTolerance the default value to replace auto with
 */
export function useUserSlippageToleranceWithDefault(defaultSlippageTolerance: Percent): Percent {
  const allowedSlippage = useUserSlippageTolerance()
  return useMemo(
    () => (allowedSlippage === 'auto' ? defaultSlippageTolerance : allowedSlippage),
    [allowedSlippage, defaultSlippageTolerance]
  )
}

export function useAddUserToken(): (token: Token) => void {
  const dispatch = useAppDispatch()
  return useCallback(
    (token: Token) => {
      dispatch(addSerializedToken({ serializedToken: serializeToken(token) }))
    },
    [dispatch]
  )
}

export function useRemoveUserAddedToken(): (chainId: number, address: string) => void {
  const dispatch = useAppDispatch()
  return useCallback(
    (chainId: number, address: string) => {
      dispatch(removeSerializedToken({ chainId, address }))
    },
    [dispatch]
  )
}

export function useUserAddedTokens(): Token[] {
  const { chainId } = useActiveWeb3React()
  const serializedTokensMap = useAppSelector(({ user: { tokens } }) => tokens)

  return useMemo(() => {
    if (!chainId) return []
    const tokenMap: Token[] = serializedTokensMap?.[chainId]
      ? Object.values(serializedTokensMap[chainId]).map(deserializeToken)
      : []
    return tokenMap
  }, [serializedTokensMap, chainId])
}
