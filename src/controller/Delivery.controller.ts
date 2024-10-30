import { Body, Controller, Post } from '@nestjs/common';
import { DeliveryService } from '@src/service/Delivery.service';
import { CreateDeliveryDto } from '@src/dto/Delivery.dto';
import { IReturnMessage } from '@src/model/ReturnMessage.model';

@Controller('v1/delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post('')
  async createDelivery(
    @Body() body: CreateDeliveryDto,
  ): Promise<IReturnMessage> {
    return await this.deliveryService.createDelivery(body);
  }
}
