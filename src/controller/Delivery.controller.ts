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
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { DeliveryService } from '@src/service/Delivery.service';
import {
  CreateDeliveryDto,
  UpdateDeliveryDto,
  ValidateCodeDto,
} from '@src/dto/Delivery.dto';
import { IDelivery } from '@src/model/Delivery.model';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@Controller('v1/delivery')
@ApiTags('Delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new delivery' })
  @ApiResponse({ status: 201, description: 'Delivery created successfully.' })
  @ApiResponse({ status: 400, description: 'Validation failed.' })
  @ApiResponse({ status: 500, description: 'Backend failed.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: CreateDeliveryDto })
  async createDelivery(
    @Body() body: CreateDeliveryDto,
  ): Promise<IReturnMessage> {
    return await this.deliveryService.createDelivery(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all deliveries' })
  @ApiResponse({
    status: 200,
    description: 'Deliveries retrieved successfully.',
  })
  @ApiResponse({ status: 500, description: 'Backend failed.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAllDelivery(): Promise<IDelivery[]> {
    return await this.deliveryService.findAllDeliverys();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Delivery ID', example: '123' })
  @ApiOperation({ summary: 'Get a specific delivery by ID' })
  @ApiResponse({ status: 200, description: 'Delivery found successfully.' })
  @ApiResponse({ status: 404, description: 'Delivery not found.' })
  @ApiResponse({ status: 400, description: 'Validation failed.' })
  @ApiResponse({ status: 500, description: 'Backend failed.' })
  async findOneDelivery(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IDelivery> {
    return await this.deliveryService.findOneDelivery(id);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'Delivery ID', example: '123' })
  @ApiOperation({ summary: 'Update an existing delivery' })
  @ApiResponse({ status: 200, description: 'Delivery updated successfully.' })
  @ApiResponse({ status: 400, description: 'Validation failed.' })
  @ApiResponse({ status: 404, description: 'Delivery not found.' })
  @ApiResponse({ status: 500, description: 'Backend failed.' })
  @ApiBody({ type: UpdateDeliveryDto })
  async updateOnDelivery(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBody: UpdateDeliveryDto,
  ): Promise<IReturnMessage> {
    return await this.deliveryService.updateOneDelivery(id, updateBody);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Delivery ID', example: '123' })
  @ApiOperation({ summary: 'Delete a specific delivery by ID' })
  @ApiResponse({ status: 200, description: 'Delivery deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Delivery not found.' })
  @ApiResponse({ status: 500, description: 'Backend failed.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async deleteOneDelivery(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IReturnMessage> {
    return await this.deliveryService.deleteOneDelivery(id);
  }

  @Put('code/:id')
  @ApiParam({ name: 'id', description: 'Delivery ID', example: '123' })
  @ApiOperation({ summary: 'Validate delivery code' })
  @ApiResponse({ status: 200, description: 'Code validated successfully.' })
  @ApiResponse({ status: 400, description: 'Validation failed.' })
  @ApiResponse({ status: 404, description: 'Delivery not found.' })
  @ApiBody({ type: ValidateCodeDto })
  async validateCode(
    @Param('id', ParseIntPipe) id: number,
    @Body() codeBody: ValidateCodeDto,
  ): Promise<IReturnMessage | boolean> {
    return await this.deliveryService.validateCode(id, codeBody);
  }

  @Put('/picture/:id')
  @ApiParam({ name: 'id', description: 'Delivery ID', example: '123' })
  @ApiOperation({ summary: 'Upload an image for a specific delivery' })
  @ApiResponse({ status: 200, description: 'Image uploaded successfully.' })
  @ApiResponse({ status: 404, description: 'Delivery not found.' })
  @ApiResponse({ status: 500, description: 'Backend failed.' })
  @UseInterceptors(FileInterceptor('image'))
  uploadImage(
    @UploadedFile() image: Express.Multer.File,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.deliveryService.uploadImage(id, image);
  }
}
