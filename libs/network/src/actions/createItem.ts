'use server'

import { revalidateTag } from 'next/cache'
import { formSchemaCreateItem } from '../../../forms/src/schemas'
import { fetchGraphQLServer } from '../fetch/server'
import { CreateItemDocument, namedOperations } from '../queries/generated'

export async function createItem(formData: FormData) {
  console.log('formdata', formData)

  const input = Object.fromEntries(formData.entries())
  console.log('input', input)

  const result = formSchemaCreateItem.safeParse(input)

  console.log('result', result)

  if (result.success) {
    console.log('result', result.data)
    const { data } = await fetchGraphQLServer({
      document: CreateItemDocument,
      variables: { createItemInput: { name: result.data.name } },
    })

    if (data) {
      revalidateTag(namedOperations.Query.myItems)
    }
  } else {
  }
}
