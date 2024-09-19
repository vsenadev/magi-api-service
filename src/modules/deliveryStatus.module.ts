import { Module } from '@nestjs/common';
import { DeliveryStatusController } from '../controller/DeliveryStatus.controller';
import { DeliveryStatusService } from '../service/deliveryStatus.service';
import { DeliveryStatusRepository } from '../repository/deliveryStatus.repository';
import { DatabaseService } from '../database/database.service';

@Module({
  imports: [],
  controllers: [DeliveryStatusController],
  providers: [DeliveryStatusService, DeliveryStatusRepository, DatabaseService],
})
export class DeliveryStatusModule {}
