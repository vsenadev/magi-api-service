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
import { LockStatusService } from '@src/service/lockStatus.service';
import {
  CreateLockStatusDto,
  UpdateLockStatusDto,
} from '@src/dto/lockStatus.dto';
import { IReturnMessage } from '@src/model/returnMessage.model';
import { ILockStatus } from '@src/model/lockStatus.model';

@Controller('v1/lockstatus')
export class LockStatusController {
  constructor(private readonly lockStatusService: LockStatusService) {}

  @Post()
  async createLockStatus(
    @Body() body: CreateLockStatusDto,
  ): Promise<IReturnMessage> {
    return await this.lockStatusService.createLockStatus(body);
  }

  @Get()
  async findAllLockStatus(): Promise<ILockStatus[]> {
    return await this.lockStatusService.findAllLockStatus();
  }

  @Get(':id')
  async findOneLockStatus(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ILockStatus> {
    return await this.lockStatusService.findOneLockStatus(id);
  }

  @Put(':id')
  async updateOneLockStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBody: UpdateLockStatusDto,
  ): Promise<IReturnMessage> {
    return await this.lockStatusService.updateOneLockStatus(id, updateBody);
  }

  @Delete(':id')
  async deleteOneLockStatus(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IReturnMessage> {
    return await this.lockStatusService.deleteOneLockStatus(id);
  }
}
