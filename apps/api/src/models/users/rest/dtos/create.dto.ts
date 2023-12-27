import { OmitType } from '@nestjs/swagger'
import { UserEntity } from '../entity/user.entity'

export class CreateUser extends OmitType(UserEntity, [
  'createdAt',
  'updatedAt',
]) {}
