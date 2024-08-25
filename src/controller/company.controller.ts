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
import { IReturnMessage } from '../model/returnMessage.model';
import { CompanyService } from '../service/company.service';
import {
  CreateCompanyDto,
  UpdateCompanyDto,
  ValidateCodeDto,
} from '../dto/company.dto';
import { ICompany } from '../model/company.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';


@Controller('api/v1/company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async createCompany(@Body() body: CreateCompanyDto): Promise<IReturnMessage> {
    return await this.companyService.createCompany(body);
  }

  @Get()
  async findAllCompanies(): Promise<ICompany[]> {
    return await this.companyService.findAllCompanies();
  }

  @Get(':id')
  async findOneCompany(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ICompany> {
    return await this.companyService.findOneCompany(id);
  }

  @Put(':id')
  async updateOneCompany(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBody: UpdateCompanyDto,
  ): Promise<IReturnMessage> {
    return await this.companyService.updateOneCompany(id, updateBody);
  }

  @Delete(':id')
  async deleteOneCompany(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IReturnMessage> {
    return await this.companyService.deleteOneCompany(id);
  }

  @Put('code/:id')
  async validateCode(
    @Param('id', ParseIntPipe) id: number,
    @Body() codeBody: ValidateCodeDto,
  ): Promise<IReturnMessage | boolean> {
    return await this.companyService.validateCode(id, codeBody);
  }

  @Put('/picture/:id')
  @UseInterceptors(FileInterceptor('image'))
  uploadImage(
    @UploadedFile() image: Express.Multer.File,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.companyService.uploadImage(id, image);
  }
}
