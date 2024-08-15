import { Module } from '@nestjs/common';
import { DatabaseService } from './database/database.service';
import { DeliveryStatusModule } from './modules/deliveryStatus.module';
import { LockStatusModule } from './modules/lockStatus.module';

@Module({
  imports: [DeliveryStatusModule, LockStatusModule],
  controllers: [],
  providers: [DatabaseService],
})
export class AppModule {}
