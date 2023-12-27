import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'

import { PrismaService } from 'src/common/prisma/prisma.service'
import { ApiTags } from '@nestjs/swagger'
import { CreateItem } from './dtos/create.dto'
import { ItemQueryDto } from './dtos/query.dto'
import { UpdateItem } from './dtos/update.dto'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger'
import { ItemEntity } from './entity/item.entity'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { GetUserType } from '@foundation/util/types'

@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ItemEntity })
  @Post()
  create(@Body() createItemDto: CreateItem) {
    return this.prisma.item.create({ data: createItemDto })
  }

  @ApiOkResponse({ type: [ItemEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: ItemQueryDto) {
    return this.prisma.item.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    })
  }

  @ApiOkResponse({ type: ItemEntity })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.prisma.item.findUnique({ where: { id } })
  }

  @ApiOkResponse({ type: ItemEntity })
  @ApiBearerAuth()
  @AllowAuthenticated()
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateItemDto: UpdateItem,
    @GetUser() user: GetUserType,
  ) {
    return this.prisma.item.update({
      where: { id },
      data: updateItemDto,
    })
  }

  @ApiBearerAuth()
  @AllowAuthenticated()
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.prisma.item.delete({ where: { id } })
  }
}
