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
  import {
    UpdateEmployeeDto,
    ValidateCodeDto,
  } from '../dto/employee.dto';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { Express } from 'express';
import { EmployeeService } from 'src/service/employee.service';
import { CreateEmployeeDto } from 'src/dto/employee.dto';
import { IEmployee } from 'src/model/employee.model';
  
  
  @Controller('api/v1/employee')
  export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}
  
    @Post()
    async createEmployee(@Body() body: CreateEmployeeDto): Promise<IReturnMessage> {
      return await this.employeeService.createEmployee(body);
    }
  
    @Get()
    async findAllEmployees(): Promise<IEmployee[]> {
      return await this.employeeService.findAllEmployees();
    }
  
    @Get(':id')
    async findOneEmployee(
      @Param('id', ParseIntPipe) id: number,
    ): Promise<IEmployee> {
      return await this.employeeService.findOneEmployee(id);
    }
  
    @Put(':id')
    async updateOnEmployee(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateBody: UpdateEmployeeDto,
    ): Promise<IReturnMessage> {
      return await this.employeeService.updateOneEmployee(id, updateBody);
    }
  
    @Delete(':id')
    async deleteOneEmployee(
      @Param('id', ParseIntPipe) id: number,
    ): Promise<IReturnMessage> {
      return await this.employeeService.deleteOneEmployee(id);
    }
  
    @Put('code/:id')
    async validateCode(
      @Param('id', ParseIntPipe) id: number,
      @Body() codeBody: ValidateCodeDto,
    ): Promise<IReturnMessage | boolean> {
      return await this.employeeService.validateCode(id, codeBody);
    }
  
    @Put('/picture/:id')
    @UseInterceptors(FileInterceptor('image'))
    uploadImage(
      @UploadedFile() image: Express.Multer.File,
      @Param('id', ParseIntPipe) id: number,
    ) {
      return this.employeeService.uploadImage(id, image);
    }
  }
  