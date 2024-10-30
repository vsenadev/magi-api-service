import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { DeliveryService } from '@src/service/Delivery.service';
import { CreateDeliveryDto } from '@src/dto/Delivery.dto';
import { IReturnMessage } from '@src/model/ReturnMessage.model';
import { IDelivery } from '@src/model/Delivery.model';

@Controller('v1/delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post('')
  async createDelivery(
    @Body() body: CreateDeliveryDto,
  ): Promise<IReturnMessage> {
    return await this.deliveryService.createDelivery(body);
  }

  @Get('/company/:id')
  async findAllDeliveries(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IDelivery[]> {
    return await this.deliveryService.findAllDeliveries(id);
  }
}
