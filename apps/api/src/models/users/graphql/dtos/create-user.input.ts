import { InputType, PickType } from '@nestjs/graphql'
import { User } from '../entity/user.entity'

@InputType()
export class CreateUserInput extends PickType(
  User,
  ['image', 'name', 'uid'],
  InputType,
) {}
