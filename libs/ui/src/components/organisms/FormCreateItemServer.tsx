import { Label } from '../atoms/label'
import { Input } from '../atoms/input'
import { Button } from '../atoms/button'
import { createItem } from '@foundation/network/src/actions/createItem'

export const FormCreateItemServer = () => {
  return (
    <form className="flex flex-col gap-2" action={createItem}>
      <Label title="Item">
        <Input placeholder="Enter item name" name="name" />
      </Label>
      <Button type="submit">Create</Button>
    </form>
  )
}
