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
import { StatusAccountService } from '@src/service/StatusAccount.service';
import {
  CreateStatusAccountDto,
  UpdateStatusAccountDto,
} from '@src/dto/StatusAccount.dto';
import { IReturnMessage } from '@src/model/ReturnMessage.model';
import { IStatusAccount } from '@src/model/StatusAccount.model';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('v1/statusaccount')
@ApiTags('Status-Account')
export class StatusAccountController {
  constructor(private readonly statusAccountService: StatusAccountService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new status account' })
  @ApiResponse({ status: 201, description: 'Status account created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request: Invalid status account data.' })
  @ApiBody({ type: CreateStatusAccountDto })
  async createStatusAccount(
    @Body() body: CreateStatusAccountDto,
  ): Promise<IReturnMessage> {
    return await this.statusAccountService.createStatusAccount(body);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all status accounts' })
  @ApiResponse({ status: 200, description: 'List of all status accounts retrieved successfully.' })
  async findAllStatusAccount(): Promise<IStatusAccount[]> {
    return await this.statusAccountService.findAllStatusAccount();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a status account by ID' })
  @ApiResponse({ status: 200, description: 'Status account retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Not Found: Status account not found.' })
  async findOneStatusAccount(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IStatusAccount> {
    return await this.statusAccountService.findOneStatusAccount(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a status account by ID' })
  @ApiResponse({ status: 200, description: 'Status account updated successfully.' })
  @ApiResponse({ status: 404, description: 'Not Found: Status account not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request: Invalid status account data.' })
  @ApiBody({ type: UpdateStatusAccountDto })
  async updateOneStatusAccount(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBody: UpdateStatusAccountDto,
  ): Promise<IReturnMessage> {
    return await this.statusAccountService.updateOneStatusAccount(id, updateBody);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a status account by ID' })
  @ApiResponse({ status: 200, description: 'Status account deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Not Found: Status account not found.' })
  async deleteOneStatusAccount(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IReturnMessage> {
    return await this.statusAccountService.deleteOneStatusAccount(id);
  }
}
