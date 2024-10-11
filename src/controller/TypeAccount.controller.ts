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
import { TypeAccountService } from '@src/service/TypeAccount.service';
import {
  CreateTypeAccountDto,
  UpdateTypeAccountDto,
} from '@src/dto/TypeAccount.dto';
import { IReturnMessage } from '@src/model/ReturnMessage.model';
import { ITypeAccount } from '@src/model/TypeAccount.model';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('v1/typeaccount')
@ApiTags('Type-Account')
export class TypeAccountController {
  constructor(private readonly typeAccountService: TypeAccountService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new type account' })
  @ApiResponse({ status: 201, description: 'Type account created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request: Invalid type account data.' })
  @ApiBody({ type: CreateTypeAccountDto })
  async createTypeAccount(
    @Body() body: CreateTypeAccountDto,
  ): Promise<IReturnMessage> {
    return await this.typeAccountService.createTypeAccount(body);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all type accounts' })
  @ApiResponse({ status: 200, description: 'List of all type accounts retrieved successfully.' })
  async findAllTypeAccount(): Promise<ITypeAccount[]> {
    return await this.typeAccountService.findAllTypeAccount();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a type account by ID' })
  @ApiResponse({ status: 200, description: 'Type account retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Not Found: Type account not found.' })
  async findOneTypeAccount(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ITypeAccount> {
    return await this.typeAccountService.findOneTypeAccount(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a type account by ID' })
  @ApiResponse({ status: 200, description: 'Type account updated successfully.' })
  @ApiResponse({ status: 404, description: 'Not Found: Type account not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request: Invalid type account data.' })
  @ApiBody({ type: UpdateTypeAccountDto })
  async updateOneTypeAccount(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBody: UpdateTypeAccountDto,
  ): Promise<IReturnMessage> {
    return await this.typeAccountService.updateOneTypeAccount(id, updateBody);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a type account by ID' })
  @ApiResponse({ status: 200, description: 'Type account deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Not Found: Type account not found.' })
  async deleteOneTypeAccount(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IReturnMessage> {
    return await this.typeAccountService.deleteOneTypeAccount(id);
  }
}
