import { Signout } from '@/components/Signout'
import { getAuth } from '@foundation/network/src/auth/authOptions'
import { add } from '@foundation/sample-lib'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

export default async function Home() {
  const user = await getAuth()
  console.log('user ', user)
  return (
    <main>
      Hello world {add(3, 4)}
      <div className="w-40 h-40"></div>
      {user?.user ? <Signout /> : <Link href={'/signIn'}>Signin</Link>}
    </main>
  )
}
