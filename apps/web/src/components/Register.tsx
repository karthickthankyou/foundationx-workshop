'use client'
import { useFormRegister } from '@foundation/forms/src/register'
import { RegisterWithCredentialsDocument } from '@foundation/network/src/queries/generated'
import { fetchGraphqlStatic } from '@foundation/network/src/fetch'
import { signIn } from 'next-auth/react'

export const Register = () => {
  const { register, handleSubmit } = useFormRegister()

  return (
    <form
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
      <label>
        Email
        <input
          className="border block px-2 py-1 rounded"
          {...register('email')}
        />
      </label>
      <label>
        Password
        <input
          className="border block px-2 py-1 rounded"
          type="password"
          {...register('password')}
        />
      </label>
      <label>
        name
        <input
          className="border block px-2 py-1 rounded"
          {...register('name')}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  )
}
