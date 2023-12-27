import { PartialType } from '@nestjs/swagger'
import { CreateItem } from './create.dto'
import { Item } from '@prisma/client'

export class UpdateItem extends PartialType(CreateItem) {
  id: Item['id']
}
