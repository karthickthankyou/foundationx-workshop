import { fetchGraphQLServer } from '@foundation/network/src/fetch/server'
import {
  MyItemsDocument,
  namedOperations,
} from '@foundation/network/src/queries/generated'
import { format } from 'date-fns'
import { FormCreateItemClient } from '../organisms/FormCreateItemClient'
import { FormCreateItemServer } from '../organisms/FormCreateItemServer'

export const MyItems = async () => {
  const { data, error } = await fetchGraphQLServer({
    document: MyItemsDocument,
    config: {
      next: {
        tags: [namedOperations.Query.myItems],
      },
    },
  })

  console.log('data ,error', data, error)

  if (error) {
    return <div>Error fetching items.</div>
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-2 my-4">
        <div>
          <div className="mb-2">Client side mutation.</div>
          <FormCreateItemClient />
        </div>
        <div>
          <div className="mb-2">Server side mutation.</div>
          <FormCreateItemServer />
        </div>
      </div>
      {data?.myItems.length === 0 ? <div>No items.</div> : null}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {data?.myItems.map((item) => (
          <div className="p-3 rounded shadow-lg " key={item.id}>
            <div className="font-semibold ">{item.name}</div>
            <div className="text-xs">{item.user.name}</div>
            <div className="text-xs text-gray-500">
              {format(new Date(item.createdAt), 'PPp')}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
