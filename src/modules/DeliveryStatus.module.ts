import { Module } from '@nestjs/common';
import { DeliveryStatusController } from '@src/controller/DeliveryStatus.controller';
import { DeliveryStatusService } from '@src/service/DeliveryStatus.service';
import { DeliveryStatusRepository } from '@src/repository/DeliveryStatus.repository';
import { DatabaseModule } from '@src/modules/Database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DeliveryStatusController],
  providers: [DeliveryStatusService, DeliveryStatusRepository],
})
export class DeliveryStatusModule {}
