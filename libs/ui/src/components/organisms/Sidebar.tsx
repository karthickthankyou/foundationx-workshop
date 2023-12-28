'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Sheet, SheetContent, SheetTrigger } from '../atoms/sheet'
import { Menu } from 'lucide-react'
import { BaseComponent } from '@foundation/util/types'

import { useDialogState } from '@foundation/util/hooks'
export const Sidebar = ({ children }: BaseComponent) => {
  const session = useSession()

  const [open, setOpen] = useDialogState()

  if (!session.data?.user) {
    return <Link href="/signIn">Sign In</Link>
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {/* <Button variant="ghost"> */}
        <Menu className="w-5 h-5" />
        {/* </Button> */}
      </SheetTrigger>
      <SheetContent>{children}</SheetContent>
    </Sheet>
  )
}
