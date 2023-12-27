import { Field, InputType, PickType } from '@nestjs/graphql'
import { User } from '../entity/user.entity'
import { AuthProviderType } from '@prisma/client'

@InputType()
export class RegisterWithProviderInput extends PickType(
  User,
  ['image', 'name', 'uid'],
  InputType,
) {
  @Field(() => AuthProviderType)
  type: AuthProviderType
}

@InputType()
export class RegisterWithCredentialsInput extends PickType(
  User,
  ['image', 'name'],
  InputType,
) {
  email: string
  password: string
}
