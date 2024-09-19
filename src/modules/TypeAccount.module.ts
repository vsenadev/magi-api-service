import { Module } from '@nestjs/common';
import { TypeAccountController } from '@src/controller/TypeAccount.controller';
import { TypeAccountService } from '@src/service/TypeAccount.service';
import { TypeAccountRepository } from '@src/repository/TypeAccount.repository';
import { DatabaseService } from '@src/database/Database.service';

@Module({
  imports: [],
  controllers: [TypeAccountController],
  providers: [TypeAccountService, TypeAccountRepository, DatabaseService],
})
export class TypeAccountModule {}
