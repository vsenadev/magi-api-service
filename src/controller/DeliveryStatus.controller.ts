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
import { DeliveryStatusService } from '@src/service/DeliveryStatus.service';
import {
  CreateDeliveryStatusDto,
  UpdateDeliveryStatusDto,
} from '@src/dto/DeliveryStatus.dto';
import { IReturnMessage } from '@src/model/ReturnMessage.model';
import { IDeliveryStatus } from '@src/model/DeliveryStatus.model';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('v1/deliverystatus')
@ApiTags('Delivery-Status')
export class DeliveryStatusController {
  constructor(private readonly deliveryStatusService: DeliveryStatusService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new delivery status' }) 
  @ApiResponse({ status: 201, description: 'Delivery status created successfully.' }) 
  @ApiResponse({ status: 400, description: 'Validation failed.' })
  @ApiResponse({ status: 500, description: 'Backend failed.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: CreateDeliveryStatusDto }) 
  async createDeliveryStatus(
    @Body() body: CreateDeliveryStatusDto,
  ): Promise<IReturnMessage> {
    return await this.deliveryStatusService.createDeliveryStatus(body);
  }


  @Get()
  @ApiOperation({ summary: 'get all delivery status by ID' }) 
  @ApiResponse({ status: 201, description: 'delivery status finded successfully.' }) 
  @ApiResponse({ status: 400, description: 'Validation failed.' })
  @ApiResponse({ status: 500, description: 'backend failed.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAllDeliveryStatus(): Promise<IDeliveryStatus[]> {
    return await this.deliveryStatusService.findAllDeliveryStatus();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'delivery status ID', example: '123' })
  @ApiOperation({ summary: 'get a especific delivery status by ID' }) 
  @ApiResponse({ status: 201, description: 'delivery status finded successfully.' }) 
  @ApiResponse({ status: 400, description: 'Validation failed.' })
  @ApiResponse({ status: 500, description: 'backend failed.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOneDeliveryStatus(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IDeliveryStatus> {
    return await this.deliveryStatusService.findOneDeliveryStatus(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a existing delivery status' }) 
  @ApiResponse({ status: 201, description: 'Delivery status been updated successfully.' }) 
  @ApiResponse({ status: 400, description: 'Validation failed.' })
  @ApiResponse({ status: 500, description: 'Backend failed.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: UpdateDeliveryStatusDto }) 
  async updateOneDeliveryStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBody: UpdateDeliveryStatusDto,
  ): Promise<IReturnMessage> {
    return await this.deliveryStatusService.updateOneDeliveryStatus(
      id,
      updateBody,
    );
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'delivery status ID', example: '123' })
  @ApiOperation({ summary: 'delete a especific delivery status by ID' }) 
  @ApiResponse({ status: 201, description: 'delivery status deleted successfully.' }) 
  @ApiResponse({ status: 400, description: 'Validation failed.' })
  @ApiResponse({ status: 500, description: 'backend failed.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async deleteOneDeliveryStatus(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IReturnMessage> {
    return await this.deliveryStatusService.deleteOneDeliveryStatus(id);
  }
}
