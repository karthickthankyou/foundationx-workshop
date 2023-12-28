'use client'
import { useFormSignIn } from '@foundation/forms/src/signin'
import { signIn } from 'next-auth/react'
import { Label } from '../atoms/label'
import { Input } from '../atoms/input'
import { Button } from '../atoms/button'
import { AuthLayout } from '../organisms/AuthLayout'
import Link from 'next/link'

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormSignIn()
  return (
    <AuthLayout title="Sign In">
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit((data) => {
          console.log('data', data)
          signIn('credentials', {
            email: data.email,
            password: data.password,
            callbackUrl: '/',
          })
        })}
      >
        <Label title="Email" error={errors.email?.message}>
          <Input {...register('email')} placeholder="Email" />
        </Label>
        <Label title="Password" error={errors.password?.message}>
          <Input
            type="password"
            {...register('password')}
            placeholder="******"
          />
        </Label>

        <Button type="submit">Submit</Button>
      </form>
      <div className="flex flex-col items-center gap-2 my-6">
        <div>
          New to application?{' '}
          <Link href="/register" className="font-semibold">
            Register.
          </Link>
        </div>
        <div className="h-[1px] bg-black/20 w-36 my-2" />
        <button
          onClick={() => {
            signIn('google', { callbackUrl: '/' })
          }}
          className="text-lg hover:shadow-lg transition-shadow flex items-center justify-center w-8 h-8 border border-[#ea4335] rounded-full"
        >
          G
        </button>
      </div>
    </AuthLayout>
  )
}
