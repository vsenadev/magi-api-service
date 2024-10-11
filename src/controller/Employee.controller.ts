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
import { UpdateEmployeeDto, ValidateCodeDto, CreateEmployeeDto } from '@src/dto/Employee.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { EmployeeService } from '@src/service/Employee.service';
import { IEmployee } from '@src/model/Employee.model';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@Controller('v1/employee')
@ApiTags('Employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new employee' })
  @ApiResponse({ status: 201, description: 'Employee created successfully.' })
  @ApiResponse({ status: 400, description: 'Validation failed.' })
  @ApiResponse({ status: 500, description: 'Backend failed.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: CreateEmployeeDto })
  async createEmployee(
    @Body() body: CreateEmployeeDto,
  ): Promise<IReturnMessage> {
    return await this.employeeService.createEmployee(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all employees' })
  @ApiResponse({ status: 200, description: 'Employees retrieved successfully.' })
  @ApiResponse({ status: 500, description: 'Backend failed.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAllEmployees(): Promise<IEmployee[]> {
    return await this.employeeService.findAllEmployees();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Employee ID', example: '123' })
  @ApiOperation({ summary: 'Get a specific employee by ID' })
  @ApiResponse({ status: 200, description: 'Employee found successfully.' })
  @ApiResponse({ status: 404, description: 'Employee not found.' })
  @ApiResponse({ status: 400, description: 'Validation failed.' })
  @ApiResponse({ status: 500, description: 'Backend failed.' })
  async findOneEmployee(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IEmployee> {
    return await this.employeeService.findOneEmployee(id);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'Employee ID', example: '123' })
  @ApiOperation({ summary: 'Update an existing employee' })
  @ApiResponse({ status: 200, description: 'Employee updated successfully.' })
  @ApiResponse({ status: 400, description: 'Validation failed.' })
  @ApiResponse({ status: 404, description: 'Employee not found.' })
  @ApiResponse({ status: 500, description: 'Backend failed.' })
  @ApiBody({ type: UpdateEmployeeDto })
  async updateOnEmployee(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBody: UpdateEmployeeDto,
  ): Promise<IReturnMessage> {
    return await this.employeeService.updateOneEmployee(id, updateBody);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Employee ID', example: '123' })
  @ApiOperation({ summary: 'Delete a specific employee by ID' })
  @ApiResponse({ status: 200, description: 'Employee deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Employee not found.' })
  @ApiResponse({ status: 500, description: 'Backend failed.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async deleteOneEmployee(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IReturnMessage> {
    return await this.employeeService.deleteOneEmployee(id);
  }

  @Put('code/:id')
  @ApiParam({ name: 'id', description: 'Employee ID', example: '123' })
  @ApiOperation({ summary: 'Validate employee code' })
  @ApiResponse({ status: 200, description: 'Code validated successfully.' })
  @ApiResponse({ status: 400, description: 'Validation failed.' })
  @ApiResponse({ status: 404, description: 'Employee not found.' })
  @ApiBody({ type: ValidateCodeDto })
  async validateCode(
    @Param('id', ParseIntPipe) id: number,
    @Body() codeBody: ValidateCodeDto,
  ): Promise<IReturnMessage | boolean> {
    return await this.employeeService.validateCode(id, codeBody);
  }

  @Put('/picture/:id')
  @ApiParam({ name: 'id', description: 'Employee ID', example: '123' })
  @ApiOperation({ summary: 'Upload an image for a specific employee' })
  @ApiResponse({ status: 200, description: 'Image uploaded successfully.' })
  @ApiResponse({ status: 404, description: 'Employee not found.' })
  @ApiResponse({ status: 500, description: 'Backend failed.' })
  @UseInterceptors(FileInterceptor('image'))
  uploadImage(
    @UploadedFile() image: Express.Multer.File,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.employeeService.uploadImage(id, image);
  }
}
