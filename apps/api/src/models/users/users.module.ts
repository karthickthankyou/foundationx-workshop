import { Module } from '@nestjs/common'
import { UsersService } from './graphql/users.service'
import { UsersResolver } from './graphql/users.resolver'

@Module({
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
