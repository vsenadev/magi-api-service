import { Module } from '@nestjs/common';
import { TypeAccountController } from '../controller/TypeAccount.controller';
import { TypeAccountService } from '../service/typeAccount.service';
import { TypeAccountRepository } from '../repository/typeAccount.repository';
import { DatabaseService } from '../database/database.service';

@Module({
  imports: [],
  controllers: [TypeAccountController],
  providers: [TypeAccountService, TypeAccountRepository, DatabaseService],
})
export class TypeAccountModule {}
