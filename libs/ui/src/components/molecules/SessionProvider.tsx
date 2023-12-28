'use client'

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'
import { BaseComponent } from '@foundation/util/types'

export const SessionProvider = ({ children }: BaseComponent) => {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
}
