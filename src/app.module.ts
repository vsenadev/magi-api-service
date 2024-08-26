import { Module } from '@nestjs/common';
import { DatabaseService } from './database/database.service';
import { DeliveryStatusModule } from './modules/deliveryStatus.module';
import { LockStatusModule } from './modules/lockStatus.module';
import { StatusAccountModule } from './modules/statusAccount.module';
import { TypeAccountModule } from './modules/typeAccount.module';
import { AddressModule } from './modules/address.module';
import { CompanyModule } from './modules/company.module';

@Module({
  imports: [
    DeliveryStatusModule,
    LockStatusModule,
    StatusAccountModule,
    TypeAccountModule,
    AddressModule,
    CompanyModule,
  ],
  controllers: [],
  providers: [DatabaseService],
})
export class AppModule {}