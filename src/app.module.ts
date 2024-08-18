import { Module } from '@nestjs/common';
import { DatabaseService } from './database/database.service';
import { DeliveryStatusModule } from './modules/deliveryStatus.module';
import { LockStatusModule } from './modules/lockStatus.module';
import { StatusAccountModule } from './modules/statusAccount.module';

@Module({
  imports: [DeliveryStatusModule, LockStatusModule, StatusAccountModule],
  controllers: [],
  providers: [DatabaseService],
})
export class AppModule {}
