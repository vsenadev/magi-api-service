import { Module } from '@nestjs/common';
import { DatabaseModule } from '@src/modules/Database.module';
import { DeliveryController } from '@src/controller/Delivery.controller';
import { DeliveryService } from '@src/service/Delivery.service';
import { DeliveryRepository } from '@src/repository/Delivery.repository';
import { Geolocalization } from '@src/utils/Geolocalization.utils';
import { AddressRepository } from '@src/repository/Address.repository';
import { Document } from '@src/utils/Document.utils';
import { QrCode } from '@src/utils/QrCode.utils';
import { Cryptography } from '@src/utils/Cryptograph.utils';
import { Email } from '@src/utils/Email.utils';
import { MqttModule } from '@src/modules/Mqtt.module';

@Module({
  imports: [DatabaseModule, MqttModule],
  controllers: [DeliveryController],
  providers: [
    DeliveryService,
    DeliveryRepository,
    Geolocalization,
    AddressRepository,
    Document,
    QrCode,
    Cryptography,
    Email,
  ],
})
export class DeliveryModule {}
