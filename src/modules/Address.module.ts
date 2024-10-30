import { Module } from '@nestjs/common';
import { AddressRepository } from '@src/repository/Address.repository';
import { DatabaseModule } from '@src/modules/Database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [AddressRepository],
})
export class AddressModule {}
