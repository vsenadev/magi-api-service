import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { IReturnMessage } from '@src/model/ReturnMessage.model';
import { CompanyService } from '@src/service/Company.service';
import {
  CreateCompanyDto,
  UpdateCompanyDto,
  ValidateCodeDto,
} from '@src/dto/Company.dto';
import { ICompany } from '@src/model/Company.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@Controller('v1/company')
@ApiTags('Company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new company' })
  @ApiResponse({ status: 201, description: 'Company created successfully.' })
  @ApiResponse({ status: 400, description: 'Validation failed.' })
  @ApiResponse({ status: 500, description: 'Backend failed.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: CreateCompanyDto })
  async createCompany(@Body() body: CreateCompanyDto): Promise<IReturnMessage> {
    return await this.companyService.createCompany(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all companies' })
  @ApiResponse({ status: 200, description: 'Companies retrieved successfully.' })
  @ApiResponse({ status: 500, description: 'Backend failed.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAllCompanies(): Promise<ICompany[]> {
    return await this.companyService.findAllCompanies();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Company ID', example: '123' })
  @ApiOperation({ summary: 'Get a specific company by ID' })
  @ApiResponse({ status: 200, description: 'Company found successfully.' })
  @ApiResponse({ status: 404, description: 'Company not found.' })
  @ApiResponse({ status: 400, description: 'Validation failed.' })
  @ApiResponse({ status: 500, description: 'Backend failed.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOneCompany(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ICompany> {
    return await this.companyService.findOneCompany(id);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'Company ID', example: '123' })
  @ApiOperation({ summary: 'Update an existing company' })
  @ApiResponse({ status: 200, description: 'Company updated successfully.' })
  @ApiResponse({ status: 400, description: 'Validation failed.' })
  @ApiResponse({ status: 404, description: 'Company not found.' })
  @ApiResponse({ status: 500, description: 'Backend failed.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: UpdateCompanyDto })
  async updateOneCompany(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBody: UpdateCompanyDto,
  ): Promise<IReturnMessage> {
    return await this.companyService.updateOneCompany(id, updateBody);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Company ID', example: '123' })
  @ApiOperation({ summary: 'Delete a specific company by ID' })
  @ApiResponse({ status: 200, description: 'Company deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Company not found.' })
  @ApiResponse({ status: 400, description: 'Validation failed.' })
  @ApiResponse({ status: 500, description: 'Backend failed.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async deleteOneCompany(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IReturnMessage> {
    return await this.companyService.deleteOneCompany(id);
  }

  @Put('code/:id')
  @ApiParam({ name: 'id', description: 'Company ID', example: '123' })
  @ApiOperation({ summary: 'Validate company code' })
  @ApiResponse({ status: 200, description: 'Code validation successful.' })
  @ApiResponse({ status: 400, description: 'Validation failed.' })
  @ApiResponse({ status: 404, description: 'Company not found.' })
  @ApiResponse({ status: 500, description: 'Backend failed.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: ValidateCodeDto })
  async validateCode(
    @Param('id', ParseIntPipe) id: number,
    @Body() codeBody: ValidateCodeDto,
  ): Promise<IReturnMessage | boolean> {
    return await this.companyService.validateCode(id, codeBody);
  }

  @Put('/picture/:id')
  @ApiParam({ name: 'id', description: 'Company ID', example: '123' })
  @ApiOperation({ summary: 'Upload a company picture' })
  @ApiResponse({ status: 200, description: 'Image uploaded successfully.' })
  @ApiResponse({ status: 400, description: 'Validation failed.' })
  @ApiResponse({ status: 404, description: 'Company not found.' })
  @ApiResponse({ status: 500, description: 'Backend failed.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseInterceptors(FileInterceptor('image'))
  uploadImage(
    @UploadedFile() image: Express.Multer.File,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.companyService.uploadImage(id, image);
  }
}
