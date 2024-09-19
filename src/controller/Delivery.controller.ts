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
import { IReturnMessage } from '@src/model/returnMessage.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { DeliveryService } from '@src/service/delivery.service';
import {
  CreateDeliveryDto,
  UpdateDeliveryDto,
  ValidateCodeDto,
} from '@src/dto/Delivery.dto';
import { IDelivery } from '@src/model/Delivery.model';

@Controller('v1/delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post()
  async createDelivery(
    @Body() body: CreateDeliveryDto,
  ): Promise<IReturnMessage> {
    return await this.deliveryService.createDelivery(body);
  }

  @Get()
  async findAllDelivery(): Promise<IDelivery[]> {
    return await this.deliveryService.findAllDeliverys();
  }

  @Get(':id')
  async findOneDelivery(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IDelivery> {
    return await this.deliveryService.findOneDelivery(id);
  }

  @Put(':id')
  async updateOnDelivery(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBody: UpdateDeliveryDto,
  ): Promise<IReturnMessage> {
    return await this.deliveryService.updateOneDelivery(id, updateBody);
  }

  @Delete(':id')
  async deleteOneDelivery(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IReturnMessage> {
    return await this.deliveryService.deleteOneDelivery(id);
  }

  @Put('code/:id')
  async validateCode(
    @Param('id', ParseIntPipe) id: number,
    @Body() codeBody: ValidateCodeDto,
  ): Promise<IReturnMessage | boolean> {
    return await this.deliveryService.validateCode(id, codeBody);
  }

  @Put('/picture/:id')
  @UseInterceptors(FileInterceptor('image'))
  uploadImage(
    @UploadedFile() image: Express.Multer.File,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.deliveryService.uploadImage(id, image);
  }
}
