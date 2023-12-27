import { InputType, OmitType, PickType } from '@nestjs/graphql'
import { Item } from '../entity/item.entity'

@InputType()
export class CreateItemInput extends PickType(Item, ['name'], InputType) {}
