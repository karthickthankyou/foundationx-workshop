import { BadRequestException, Injectable } from '@nestjs/common'
import { FindManyUserArgs, FindUniqueUserArgs } from './dtos/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import {
  RegisterWithCredentialsInput,
  RegisterWithProviderInput,
} from './dtos/create-user.input'
import { UpdateUserInput } from './dtos/update-user.input'
import { JwtService } from '@nestjs/jwt'
import { AuthOutput, LoginInput } from './entity/user.entity'
import { AuthProviderType } from '@prisma/client'

import * as bcrypt from 'bcryptjs'
import { v4 as uuid } from 'uuid'

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async registerWithProvider({
    image,
    name,
    type,
    uid,
  }: RegisterWithProviderInput): Promise<AuthOutput> {
    const user = await this.prisma.user.create({
      data: {
        uid,
        image,
        name,
        AuthProvider: {
          create: {
            type,
          },
        },
      },
    })

    const token = this.jwtService.sign({ uid: user.uid })
    return { user, token }
  }

  async login({ email, password }: LoginInput): Promise<AuthOutput> {
    const credentials = await this.prisma.credentials.findUnique({
      where: { email },
      include: { user: true },
    })

    if (
      !credentials ||
      !bcrypt.compareSync(password, credentials?.passwordHash)
    ) {
      throw new BadRequestException('Invalid email or password')
    }

    const token = this.jwtService.sign({ uid: credentials.uid })
    return {
      user: credentials.user,
      token,
    }
  }

  async registerWithCredentials({
    email,
    name,
    password,
    image,
  }: RegisterWithCredentialsInput): Promise<AuthOutput> {
    const existingUser = await this.prisma.credentials.findUnique({
      where: { email },
    })
    if (existingUser) {
      throw new Error('User already exists with this email.')
    }

    // Hash the password
    const salt = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(password, salt)

    const uid = uuid()

    // Create the user and credentials
    const user = await this.prisma.user.create({
      data: {
        name,
        uid,
        image,
        Credentials: {
          create: {
            email,
            passwordHash,
          },
        },
        AuthProvider: {
          create: {
            type: AuthProviderType.CREDENTIALS,
          },
        },
      },
    })

    const token = this.jwtService.sign({ uid: user.uid })
    return {
      user,
      token,
    }
  }

  findAll(args: FindManyUserArgs) {
    return this.prisma.user.findMany(args)
  }

  findOne(args: FindUniqueUserArgs) {
    return this.prisma.user.findUnique(args)
  }

  update(updateUserInput: UpdateUserInput) {
    const { uid, ...data } = updateUserInput
    return this.prisma.user.update({
      where: { uid },
      data: data,
    })
  }

  remove(args: FindUniqueUserArgs) {
    return this.prisma.user.delete(args)
  }
}
