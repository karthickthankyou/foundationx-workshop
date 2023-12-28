'use client'
import { useFormCreateItem } from '@foundation/forms/src/createItem'
import { Label } from '../atoms/label'
import { Input } from '../atoms/input'
import { Button } from '../atoms/button'
import { fetchGraphQLClient } from '@foundation/network/src/fetch/client'
import {
  CreateItemDocument,
  namedOperations,
} from '@foundation/network/src/queries/generated'
import { revalidate } from '@foundation/network/src/actions/revalidate'
export const FormCreateItemClient = () => {
  const { register, handleSubmit } = useFormCreateItem()

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={handleSubmit(async ({ name }) => {
        const { data, error } = await fetchGraphQLClient({
          document: CreateItemDocument,
          variables: { createItemInput: { name } },
        })

        if (data) {
          revalidate(namedOperations.Query.myItems)
        }

        if (error) {
          alert('Mutation failed.')
        }
      })}
    >
      <Label title="Item">
        <Input {...register('name')} placeholder="Enter item name" />
      </Label>
      <Button>Create</Button>
    </form>
  )
}
