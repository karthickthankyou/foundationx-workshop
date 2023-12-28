import Link from 'next/link'

import { cn } from '../../util'
import { DeveloperInfo } from './developerInfo'

export interface IBrandProps {}

export const Brand = () => {
  return (
    <div>
      <Link
        href="/"
        className={cn('hover:underline font-medium underline-offset-4')}
      >
        Foundation X
      </Link>
      <DeveloperInfo />
    </div>
  )
}
