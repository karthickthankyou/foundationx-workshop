import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { UserOrderByWithRelationInput } from 'src/models/users/graphql/dtos/order-by.args'

@InputType()
export class ItemOrderByWithRelationInputStrict
  implements
    RestrictProperties<
      ItemOrderByWithRelationInputStrict,
      Omit<Prisma.ItemOrderByWithRelationInput, 'image'>
    >
{
  @Field(() => Prisma.SortOrder)
  id: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  updatedAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  name: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  uid: Prisma.SortOrder
  user: UserOrderByWithRelationInput
}

@InputType()
export class ItemOrderByWithRelationInput extends PartialType(
  ItemOrderByWithRelationInputStrict,
) {}

@InputType()
export class ItemOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder
}
