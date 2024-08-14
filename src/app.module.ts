import { Module } from '@nestjs/common';
import { DatabaseService } from './database/database.service';
import { DeliveryStatusModule } from './modules/deliveryStatus.module';

@Module({
  imports: [DeliveryStatusModule],
  controllers: [],
  providers: [DatabaseService],
})
export class AppModule {}
