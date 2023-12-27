import { ForbiddenException, Injectable } from '@nestjs/common'
import { FindManyItemArgs, FindUniqueItemArgs } from './dtos/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateItemInput } from './dtos/create-item.input'
import { UpdateItemInput } from './dtos/update-item.input'
import { Item } from './entity/item.entity'

@Injectable()
export class ItemsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createItemInput: CreateItemInput, uid: string) {
    return this.prisma.item.create({
      data: { ...createItemInput, user: { connect: { uid } } },
    })
  }

  findAll(args: FindManyItemArgs) {
    return this.prisma.item.findMany(args)
  }

  findOne(args: FindUniqueItemArgs) {
    return this.prisma.item.findUnique(args)
  }

  async getItemByOwner(itemId: number, uid: string): Promise<Item> {
    const item = await this.prisma.item.findUnique({ where: { id: itemId } })
    if (item.uid !== uid) {
      throw new ForbiddenException()
    }
    return item
  }

  update(updateItemInput: UpdateItemInput) {
    const { id, ...data } = updateItemInput
    return this.prisma.item.update({
      where: { id },
      data: data,
    })
  }

  remove(args: FindUniqueItemArgs) {
    return this.prisma.item.delete(args)
  }
}
