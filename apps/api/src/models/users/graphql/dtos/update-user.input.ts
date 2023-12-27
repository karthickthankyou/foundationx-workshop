import { User } from '../entity/user.entity'
import { InputType, PartialType, PickType } from '@nestjs/graphql'

@InputType()
export class UpdateUserInput extends PartialType(
  PickType(User, ['image', 'name']),
) {
  uid: User['uid']
}
