import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { UsersService } from './users.service'
import { AuthOutput, LoginInput, User } from './entity/user.entity'
import { FindManyUserArgs, FindUniqueUserArgs } from './dtos/find.args'
import {
  RegisterWithProviderInput,
  RegisterWithCredentialsInput,
} from './dtos/create-user.input'
import { UpdateUserInput } from './dtos/update-user.input'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { GetUserType } from '@foundation/util/types'
import { Item } from 'src/models/items/graphql/entity/item.entity'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation(() => AuthOutput)
  registerWithProvider(
    @Args('registerWithProviderInput') args: RegisterWithProviderInput,
  ) {
    try {
      return this.usersService.registerWithProvider(args)
    } catch (error) {
      throw new Error(error)
    }
  }

  @Mutation(() => AuthOutput)
  async registerWithCredentials(
    @Args('registerWithCredentialsInput')
    args: RegisterWithCredentialsInput,
  ) {
    try {
      return this.usersService.registerWithCredentials(args)
    } catch (error) {
      throw new Error(error)
    }
  }

  @Mutation(() => AuthOutput)
  async login(
    @Args('loginInput')
    args: LoginInput,
  ) {
    try {
      return this.usersService.login(args)
    } catch (error) {
      throw new Error(error)
    }
  }

  //   @AllowAuthenticated('admin')
  @Query(() => [User], { name: 'users' })
  findAll(@Args() args: FindManyUserArgs, @GetUser() user: GetUserType) {
    console.log('user ', user)
    return this.usersService.findAll(args)
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args() args: FindUniqueUserArgs) {
    return this.usersService.findOne(args)
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') args: UpdateUserInput) {
    return this.usersService.update(args)
  }

  @Mutation(() => User)
  removeUser(@Args() args: FindUniqueUserArgs) {
    return this.usersService.remove(args)
  }

  @ResolveField(() => [Item])
  items(@Parent() parent: User) {
    return this.prisma.item.findMany({ where: { uid: parent.uid } })
  }

  @ResolveField(() => String)
  async email(@Parent() parent: User) {
    const cred = await this.prisma.credentials.findUnique({
      where: { uid: parent.uid },
    })
    return cred.email
  }
}
