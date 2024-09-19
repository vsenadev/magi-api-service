import { Module } from '@nestjs/common';
import { StatusAccountController } from '@src/controller/StatusAccount.controller';
import { StatusAccountService } from '@src/service/StatusAccount.service';
import { StatusAccountRepository } from '@src/repository/StatusAccount.repository';
import { DatabaseService } from '@src/database/Database.service';

@Module({
  imports: [],
  controllers: [StatusAccountController],
  providers: [StatusAccountService, StatusAccountRepository, DatabaseService],
})
export class StatusAccountModule {}
