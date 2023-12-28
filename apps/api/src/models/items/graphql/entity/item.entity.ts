import { Field, ObjectType } from '@nestjs/graphql'
import { Item as ItemType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Item implements RestrictProperties<Item, ItemType> {
  @Field({ nullable: true })
  image: string
  id: number
  createdAt: Date
  updatedAt: Date
  uid: string
  name: string
}
