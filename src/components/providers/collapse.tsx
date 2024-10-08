'use client'

import { SIDEBAR_PERSIST_COLLAPSE_KEY } from '@/constants/keys'
import createContext from '@/libs/context'
import { isSSR } from '@/libs/utils'
import { PropsWithChildren, useEffect, useState } from 'react'
import { useThrottledCallback } from 'use-debounce'

interface CollapsePersistContextValue {
  persistCollapseData: (key: string, bool: boolean) => void
  getCollapseState: (key: string) => boolean
}

const [Provider, usePersistCollapseContext] = createContext<CollapsePersistContextValue>({
  name: 'SidebarContext',
})

export { usePersistCollapseContext }

export const CollapsePersistProvider = ({ children }: PropsWithChildren) => {
  const [collapses, setCollapses] = useState<Record<string, boolean>>(() => {
    if (isSSR()) return {}
    try {
      const persistData = JSON.parse(localStorage.getItem(SIDEBAR_PERSIST_COLLAPSE_KEY) || '{}')
      return persistData
    } catch (error) {
      localStorage.setItem(SIDEBAR_PERSIST_COLLAPSE_KEY, '{}')
      return {}
    }
  })

  const persistCollapseData = useThrottledCallback((key: string, state: boolean) => {
    setCollapses((prev) => ({ ...prev, [key]: state }))
  }, 300)
  const getCollapseState = (key: string) => collapses[key] || false

  useEffect(() => {
    localStorage.setItem(SIDEBAR_PERSIST_COLLAPSE_KEY, JSON.stringify(collapses))
  }, [collapses])

  return <Provider value={{ getCollapseState, persistCollapseData }}>{children}</Provider>
}
