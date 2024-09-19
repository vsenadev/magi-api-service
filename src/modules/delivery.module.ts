import { Module } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RandomCode } from '../utils/randomCode.utils';
import { Cryptography } from '../utils/cryptograph.utils';
import { Email } from '../utils/Email.utils';
import { DeliveryController } from '@src/controller/Delivery.controller';
import { DeliveryService } from 'src/service/delivery.service';
import { DeliveryRepository } from 'src/repository/Delivery.repository';

@Module({
  imports: [],
  controllers: [DeliveryController],
  providers: [
    DeliveryService,
    DeliveryRepository,
    DatabaseService,
    RandomCode,
    Cryptography,
    Email,
  ],
})
export class DeliveryModule {}
