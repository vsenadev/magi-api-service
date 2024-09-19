import { Module } from '@nestjs/common';
import { StatusAccountController } from '../controller/StatusAccount.controller';
import { StatusAccountService } from '../service/statusAccount.service';
import { StatusAccountRepository } from '../repository/statusAccount.repository';
import { DatabaseService } from '../database/database.service';

@Module({
  imports: [],
  controllers: [StatusAccountController],
  providers: [StatusAccountService, StatusAccountRepository, DatabaseService],
})
export class StatusAccountModule {}
