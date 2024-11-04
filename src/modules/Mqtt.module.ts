import { Module } from '@nestjs/common';
import { MqttService } from '../middleware/Mqtt.service';
import { DatabaseModule } from '@src/modules/Database.module';
import { DeliveryRepository } from '@src/repository/Delivery.repository';
import { Geolocalization } from '@src/utils/Geolocalization.utils';
import { Email } from '@src/utils/Email.utils';

@Module({
  imports: [DatabaseModule],
  providers: [MqttService, DeliveryRepository, Geolocalization, Email],
  exports: [MqttService],
})
export class MqttModule {}
