import { ArgsType, Field, registerEnumType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { ItemOrderByWithRelationInput } from './order-by.args'
import { ItemWhereInput, ItemWhereUniqueInput } from './where.args'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType(Prisma.ItemScalarFieldEnum, {
  name: 'ItemScalarFieldEnum',
})

@ArgsType()
class FindManyItemArgsStrict
  implements
    RestrictProperties<
      FindManyItemArgsStrict,
      Omit<Prisma.ItemFindManyArgs, 'include' | 'select'>
    >
{
  where: ItemWhereInput
  orderBy: ItemOrderByWithRelationInput[]
  cursor: ItemWhereUniqueInput
  take: number
  skip: number
  @Field(() => [Prisma.ItemScalarFieldEnum])
  distinct: Prisma.ItemScalarFieldEnum[]
}

@ArgsType()
export class FindManyItemArgs extends PartialType(FindManyItemArgsStrict) {}

@ArgsType()
export class FindUniqueItemArgs {
  where: ItemWhereUniqueInput
}
