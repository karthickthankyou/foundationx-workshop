'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { formSchemaCreateItem } from './schemas'

export type FormTypeCreateItem = z.infer<typeof formSchemaCreateItem>

export const useFormCreateItem = () =>
  useForm<FormTypeCreateItem>({
    resolver: zodResolver(formSchemaCreateItem),
  })
