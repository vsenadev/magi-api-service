import { Module } from '@nestjs/common';
import { DeliveryStatusController } from '@src/controller/DeliveryStatus.controller';
import { DeliveryStatusService } from '@src/service/DeliveryStatus.service';
import { DeliveryStatusRepository } from '@src/repository/DeliveryStatus.repository';
import { DatabaseService } from '@src/database/Database.service';

@Module({
  imports: [],
  controllers: [DeliveryStatusController],
  providers: [DeliveryStatusService, DeliveryStatusRepository, DatabaseService],
})
export class DeliveryStatusModule {}
