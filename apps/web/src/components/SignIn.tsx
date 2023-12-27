'use client'
import { useFormSignIn } from '@foundation/forms/src/signin'
import { signIn } from 'next-auth/react'

export const SignIn = () => {
  const { register, handleSubmit } = useFormSignIn()
  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log('data', data)
        signIn('credentials', {
          email: data.email,
          password: data.password,
          callbackUrl: '/',
        })
      })}
    >
      <label title="Email">
        <input {...register('email')} placeholder="Email" />
      </label>
      <label title="Password">
        <input type="password" {...register('password')} placeholder="******" />
      </label>

      <button type="submit">Submit</button>
    </form>
  )
}
