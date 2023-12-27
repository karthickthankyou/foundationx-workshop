import { OmitType } from '@nestjs/swagger'
import { ItemEntity } from '../entity/item.entity'

export class CreateItem extends OmitType(ItemEntity, [
  'createdAt',
  'updatedAt',
  'id',
]) {}
