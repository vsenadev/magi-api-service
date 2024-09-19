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
import { DeliveryStatusService } from '@src/service/deliveryStatus.service';
import {
  CreateDeliveryStatusDto,
  UpdateDeliveryStatusDto,
} from '@src/dto/deliveryStatus.dto';
import { IReturnMessage } from '@src/model/returnMessage.model';
import { IDeliveryStatus } from '@src/model/deliveryStatus.model';

@Controller('v1/deliverystatus')
export class DeliveryStatusController {
  constructor(private readonly deliveryStatusService: DeliveryStatusService) {}

  @Post()
  async createDeliveryStatus(
    @Body() body: CreateDeliveryStatusDto,
  ): Promise<IReturnMessage> {
    return await this.deliveryStatusService.createDeliveryStatus(body);
  }

  @Get()
  async findAllDeliveryStatus(): Promise<IDeliveryStatus[]> {
    return await this.deliveryStatusService.findAllDeliveryStatus();
  }

  @Get(':id')
  async findOneDeliveryStatus(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IDeliveryStatus> {
    return await this.deliveryStatusService.findOneDeliveryStatus(id);
  }

  @Put(':id')
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
  async deleteOneDeliveryStatus(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IReturnMessage> {
    return await this.deliveryStatusService.deleteOneDeliveryStatus(id);
  }
}
