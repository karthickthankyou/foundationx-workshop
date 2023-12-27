'use client'
import { signOut } from 'next-auth/react'

export const Signout = () => {
  return (
    <button className="" onClick={() => signOut()}>
      Signout
    </button>
  )
}
