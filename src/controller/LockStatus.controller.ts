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
import { LockStatusService } from '@src/service/LockStatus.service';
import {
  CreateLockStatusDto,
  UpdateLockStatusDto,
} from '@src/dto/LockStatus.dto';
import { IReturnMessage } from '@src/model/ReturnMessage.model';
import { ILockStatus } from '@src/model/LockStatus.model';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@Controller('v1/lockstatus')
@ApiTags('LockStatus')
export class LockStatusController {
  constructor(private readonly lockStatusService: LockStatusService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new lock status' })
  @ApiResponse({
    status: 201,
    description: 'Lock status created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Validation failed.' })
  @ApiResponse({ status: 500, description: 'Backend failed.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: CreateLockStatusDto })
  async createLockStatus(
    @Body() body: CreateLockStatusDto,
  ): Promise<IReturnMessage> {
    return await this.lockStatusService.createLockStatus(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all lock statuses' })
  @ApiResponse({
    status: 200,
    description: 'Lock statuses retrieved successfully.',
  })
  @ApiResponse({ status: 500, description: 'Backend failed.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAllLockStatus(): Promise<ILockStatus[]> {
    return await this.lockStatusService.findAllLockStatus();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Lock status ID', example: '123' })
  @ApiOperation({ summary: 'Get a specific lock status by ID' })
  @ApiResponse({ status: 200, description: 'Lock status found successfully.' })
  @ApiResponse({ status: 404, description: 'Lock status not found.' })
  @ApiResponse({ status: 400, description: 'Validation failed.' })
  @ApiResponse({ status: 500, description: 'Backend failed.' })
  async findOneLockStatus(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ILockStatus> {
    return await this.lockStatusService.findOneLockStatus(id);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'Lock status ID', example: '123' })
  @ApiOperation({ summary: 'Update an existing lock status' })
  @ApiResponse({
    status: 200,
    description: 'Lock status updated successfully.',
  })
  @ApiResponse({ status: 400, description: 'Validation failed.' })
  @ApiResponse({ status: 404, description: 'Lock status not found.' })
  @ApiBody({ type: UpdateLockStatusDto })
  async updateOneLockStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBody: UpdateLockStatusDto,
  ): Promise<IReturnMessage> {
    return await this.lockStatusService.updateOneLockStatus(id, updateBody);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Lock status ID', example: '123' })
  @ApiOperation({ summary: 'Delete a specific lock status by ID' })
  @ApiResponse({
    status: 200,
    description: 'Lock status deleted successfully.',
  })
  @ApiResponse({ status: 404, description: 'Lock status not found.' })
  @ApiResponse({ status: 500, description: 'Backend failed.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async deleteOneLockStatus(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IReturnMessage> {
    return await this.lockStatusService.deleteOneLockStatus(id);
  }
}
