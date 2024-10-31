import { Module } from '@nestjs/common';
import { TypeAccountController } from '@src/controller/TypeAccount.controller';
import { TypeAccountService } from '@src/service/TypeAccount.service';
import { TypeAccountRepository } from '@src/repository/TypeAccount.repository';
import { DatabaseService } from '@src/database/Database.service';
import { DatabaseModule } from '@src/modules/Database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TypeAccountController],
  providers: [TypeAccountService, TypeAccountRepository],
})
export class TypeAccountModule {}
