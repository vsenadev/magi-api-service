import { Module } from '@nestjs/common';
import { AddressRepository } from '@src/repository/Address.repository';
import { DatabaseService } from '@src/database/Database.service';

@Module({
  imports: [],
  controllers: [],
  providers: [AddressRepository, DatabaseService],
})
export class AddressModule {}
