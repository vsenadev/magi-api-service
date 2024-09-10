import { Module } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RandomCode } from '../utils/randomCode.utils';
import { Cryptography } from '../utils/cryptograph.utils';
import { Email } from '../utils/Email.utils';
import { ProductDeliveryController } from 'src/controller/ProductDelivery.controller';
import { ProductDeliveryRepository } from 'src/repository/ProductDelivery.repository';
import { ProductDeliveryService } from 'src/service/productDelivery.service';

@Module({
  imports: [],
  controllers: [ProductDeliveryController],
  providers: [
    ProductDeliveryService,
    ProductDeliveryRepository,
    DatabaseService,
    RandomCode,
    Cryptography,
    Email,
  ],
})
export class ProductDeliveryModule {}
