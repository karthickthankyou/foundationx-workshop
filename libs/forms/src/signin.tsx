'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { formSchemaSignIn } from './schemas'

export type FormTypeSignIn = z.infer<typeof formSchemaSignIn>

export const useFormSignIn = () =>
  useForm<FormTypeSignIn>({
    resolver: zodResolver(formSchemaSignIn),
  })
