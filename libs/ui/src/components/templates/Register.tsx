'use client'
import { useFormRegister } from '@foundation/forms/src/register'
import { RegisterWithCredentialsDocument } from '@foundation/network/src/queries/generated'
import { fetchGraphqlStatic } from '@foundation/network/src/fetch'
import { signIn } from 'next-auth/react'
import { AuthLayout } from '../organisms/AuthLayout'
import { Label } from '../atoms/label'
import { Input } from '../atoms/input'
import { Button } from '../atoms/button'
import Link from 'next/link'

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormRegister()

  return (
    <AuthLayout title="Regiter">
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(async (formData) => {
          console.log('data', formData)
          const { data, error } = await fetchGraphqlStatic({
            document: RegisterWithCredentialsDocument,
            variables: {
              registerWithCredentialsInput: formData,
            },
          })
          if (error) {
            alert(error)
          }

          if (data) {
            alert(`User ${data.registerWithCredentials.user.uid} created. 🎉`)
            signIn('credentials', {
              email: formData.email,
              password: formData.password,
              callbackUrl: '/',
            })
          }
        })}
      >
        <Label title="Email" error={errors.email?.message}>
          <Input
            className="block px-2 py-1 border rounded"
            placeholder="Enter the email"
            {...register('email')}
          />
        </Label>
        <Label title="Password" error={errors.password?.message}>
          <Input
            placeholder="******"
            className="block px-2 py-1 border rounded"
            type="password"
            {...register('password')}
          />
        </Label>
        <Label title="Name" error={errors.name?.message}>
          <Input
            placeholder="Enter the name"
            className="block px-2 py-1 border rounded"
            {...register('name')}
          />
        </Label>
        <Button type="submit">Submit</Button>
      </form>
      <div className="flex flex-col items-center gap-2 my-6">
        <div>
          Already have an account?{' '}
          <Link href="/signIn" className="font-semibold">
            Signin?
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
