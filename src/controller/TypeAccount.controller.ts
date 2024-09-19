import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { TypeAccountService } from '@src/service/typeAccount.service';
import {
  CreateTypeAccountDto,
  UpdateTypeAccountDto,
} from '@src/dto/typeAccount.dto';
import { IReturnMessage } from '@src/model/returnMessage.model';
import { ITypeAccount } from '@src/model/typeAccount.model';

@Controller('v1/typeaccount')
export class TypeAccountController {
  constructor(private readonly typeAccountService: TypeAccountService) {}

  @Post()
  async createTypeAccount(
    @Body() body: CreateTypeAccountDto,
  ): Promise<IReturnMessage> {
    return await this.typeAccountService.createTypeAccount(body);
  }

  @Get()
  async findAllTypeAccount(): Promise<ITypeAccount[]> {
    return await this.typeAccountService.findAllTypeAccount();
  }

  @Get(':id')
  async findOneTypeAccount(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ITypeAccount> {
    return await this.typeAccountService.findOneTypeAccount(id);
  }

  @Put(':id')
  async updateOneTypeAccount(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBody: UpdateTypeAccountDto,
  ): Promise<IReturnMessage> {
    return await this.typeAccountService.updateOneTypeAccount(id, updateBody);
  }

  @Delete(':id')
  async deleteOneTypeAccount(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IReturnMessage> {
    return await this.typeAccountService.deleteOneTypeAccount(id);
  }
}
