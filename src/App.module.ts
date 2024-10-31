import { Module } from '@nestjs/common';
import { DatabaseService } from '@src/database/Database.service';
import { DeliveryStatusModule } from '@src/modules/DeliveryStatus.module';
import { LockStatusModule } from '@src/modules/LockStatus.module';
import { StatusAccountModule } from '@src/modules/StatusAccount.module';
import { TypeAccountModule } from '@src/modules/TypeAccount.module';
import { AddressModule } from '@src/modules/Address.module';
import { CompanyModule } from '@src/modules/Company.module';
import { EmployeeModule } from '@src/modules/Employee.module';
import { ProductModule } from '@src/modules/Product.module';
import { AuthModule } from '@src/modules/Auth.module';
import { DatabaseModule } from '@src/modules/Database.module';
import { DeliveryModule } from '@src/modules/Delivery.module';

@Module({
  imports: [
    DeliveryModule,
    DeliveryStatusModule,
    LockStatusModule,
    StatusAccountModule,
    TypeAccountModule,
    AddressModule,
    CompanyModule,
    EmployeeModule,
    DatabaseModule,
    ProductModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
