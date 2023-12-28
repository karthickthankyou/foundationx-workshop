import { Item } from '@prisma/client'
import { IsDate, IsString, IsInt, IsOptional } from 'class-validator'
import { RestrictProperties } from 'src/common/dtos/common.input'

export class ItemEntity implements RestrictProperties<ItemEntity, Item> {
  @IsOptional()
  image: string
  id: number
  createdAt: Date
  updatedAt: Date
  name: string
  uid: string
}
