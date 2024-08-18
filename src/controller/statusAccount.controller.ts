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
import { StatusAccountService } from '../service/statusAccount.service';
import {
  CreateStatusAccountDto,
  UpdateStatusAccountDto,
} from '../dto/statusAccount.dto';
import { IReturnMessage } from '../model/returnMessage.model';
import { IStatusAccount } from '../model/statusAccount.model';

@Controller('api/v1/statusaccount')
export class StatusAccountController {
  constructor(private readonly statusAccountService: StatusAccountService) {}

  @Post()
  async createStatusAccount(
    @Body() body: CreateStatusAccountDto,
  ): Promise<IReturnMessage> {
    return await this.statusAccountService.createStatusAccount(body);
  }

  @Get()
  async findAllStatusAccount(): Promise<IStatusAccount[]> {
    return await this.statusAccountService.findAllStatusAccount();
  }

  @Get(':id')
  async findOneStatusAccount(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IStatusAccount> {
    return await this.statusAccountService.findOneStatusAccount(id);
  }

  @Put(':id')
  async updateOneStatusAccount(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBody: UpdateStatusAccountDto,
  ): Promise<IReturnMessage> {
    return await this.statusAccountService.updateOneStatusAccount(
      id,
      updateBody,
    );
  }

  @Delete(':id')
  async deleteOneStatusAccount(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IReturnMessage> {
    return await this.statusAccountService.deleteOneStatusAccount(id);
  }
}
