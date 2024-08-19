import { Module } from '@nestjs/common';
import { AddressRepository } from '../repository/address.repository';
import { DatabaseService } from '../database/database.service';

@Module({
  imports: [],
  controllers: [],
  providers: [AddressRepository, DatabaseService],
})
export class AddressModule {}
