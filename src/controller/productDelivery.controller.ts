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
  import { FileInterceptor } from '@nestjs/platform-express';
  import { Express } from 'express';
import { IProductDelivery } from 'src/model/productDelivery.model';
import { CreateProductDeliveryDto, UpdateProductDeliveryDto, ValidateCodeDto } from 'src/dto/productDelivery.dto';
import { ProductDeliveryService } from 'src/service/productDelivery.service';

  
  
  @Controller('api/v1/product_delivery')
  export class ProductDeliveryController {
    constructor(private readonly productDeliveryService: ProductDeliveryService) {}
  
    @Post()
    async createProductDelivery(@Body() body: CreateProductDeliveryDto): Promise<IReturnMessage> {
      return await this.productDeliveryService.createProductDelivery(body);
    }
  
    @Get()
    async findAllProductDeliverys(): Promise<IProductDelivery[]> {
      return await this.productDeliveryService.findAllProductDeliverys();
    }
  
    @Get(':id')
    async findOneProductDelivery(
      @Param('id', ParseIntPipe) id: number,
    ): Promise<IProductDelivery> {
      return await this.productDeliveryService.findOneProductDelivery(id);
    }
  
    @Put(':id')
    async updateOnProductDelivery(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateBody: UpdateProductDeliveryDto,
    ): Promise<IReturnMessage> {
      return await this.productDeliveryService.updateOneProductDelivery(id, updateBody);
    }
  
    @Delete(':id')
    async deleteOneProductDelivery(
      @Param('id', ParseIntPipe) id: number,
    ): Promise<IReturnMessage> {
      return await this.productDeliveryService.deleteOneProductDelivery(id);
    }
  
    @Put('code/:id')
    async validateCode(
      @Param('id', ParseIntPipe) id: number,
      @Body() codeBody: ValidateCodeDto,
    ): Promise<IReturnMessage | boolean> {
      return await this.productDeliveryService.validateCode(id, codeBody);
    }
  }
  