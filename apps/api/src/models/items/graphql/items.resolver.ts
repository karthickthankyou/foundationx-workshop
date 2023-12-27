import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { ItemsService } from './items.service'
import { Item } from './entity/item.entity'
import { FindManyItemArgs, FindUniqueItemArgs } from './dtos/find.args'
import { CreateItemInput } from './dtos/create-item.input'
import { UpdateItemInput } from './dtos/update-item.input'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { GetUserType } from '@foundation/util/types'
import { User } from 'src/models/users/graphql/entity/user.entity'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Resolver(() => Item)
export class ItemsResolver {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Item)
  createItem(
    @Args('createItemInput') args: CreateItemInput,
    @GetUser() user: GetUserType,
  ) {
    return this.itemsService.create(args, user.uid)
  }

  @AllowAuthenticated('admin')
  @Query(() => [Item], { name: 'items' })
  findAll(@Args() args: FindManyItemArgs) {
    return this.itemsService.findAll(args)
  }

  @AllowAuthenticated()
  @Query(() => [Item], { name: 'myItems' })
  myItems(@Args() args: FindManyItemArgs, @GetUser() user: GetUserType) {
    return this.itemsService.findAll({
      ...args,
      where: { ...args.where, uid: { equals: user.uid } },
    })
  }

  @AllowAuthenticated()
  @Query(() => Item, { name: 'item' })
  async findOne(
    @Args() args: FindUniqueItemArgs,
    @GetUser() user: GetUserType,
  ) {
    return this.itemsService.getItemByOwner(args.where.id, user.uid)
  }

  @AllowAuthenticated()
  @Mutation(() => Item)
  async updateItem(
    @Args('updateItemInput') args: UpdateItemInput,
    @GetUser() user: GetUserType,
  ) {
    await this.itemsService.getItemByOwner(args.id, user.uid)
    return this.itemsService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Item)
  async removeItem(
    @Args() args: FindUniqueItemArgs,
    @GetUser() user: GetUserType,
  ) {
    await this.itemsService.getItemByOwner(args.where.id, user.uid)
    return this.itemsService.remove(args)
  }

  @ResolveField(() => User)
  user(@Parent() parent: Item) {
    return this.prisma.user.findUnique({ where: { uid: parent.uid } })
  }
}
