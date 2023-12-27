// /types/next-auth.ts

import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user?: DefaultSession['user'] & { uid: string }
  }
}
