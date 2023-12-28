import { getAuth } from '@foundation/network/src/auth/authOptions'
import { add } from '@foundation/sample-lib'
import { HomePage } from '@foundation/ui/src/components/templates/HomePage'

export default async function Home() {
  const user = await getAuth()
  console.log('user ', user)
  return (
    <main>
      <HomePage />
    </main>
  )
}
