import { Module } from '@nestjs/common';
import { DatabaseService } from '@src/database/Database.service';
import { RandomCode } from '@src/utils/RandomCode.utils';
import { Cryptography } from '@src/utils/Cryptograph.utils';
import { Email } from '@src/utils/Email.utils';
import { DeliveryController } from '@src/controller/Delivery.controller';
import { DeliveryService } from '@src/service/Delivery.service';
import { DeliveryRepository } from '@src/repository/Delivery.repository';

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
