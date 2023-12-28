import { BaseComponent } from '@foundation/util/types'

export interface IAuthLayoutProps extends BaseComponent {
  title: string
}
export const AuthLayout = ({
  title,
  children,
  className,
}: IAuthLayoutProps) => {
  return (
    <div className="flex items-start  justify-center bg-gray-200 min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md p-4 mt-12 border border-white rounded shadow-xl bg-white/60 shadow-black/10">
        <div className="mb-6 text-xl font-semibold">{title}</div>
        <div className={className}>{children}</div>
      </div>
    </div>
  )
}
