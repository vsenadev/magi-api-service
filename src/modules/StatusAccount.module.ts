import { Module } from '@nestjs/common';
import { StatusAccountController } from '@src/controller/StatusAccount.controller';
import { StatusAccountService } from '@src/service/StatusAccount.service';
import { StatusAccountRepository } from '@src/repository/StatusAccount.repository';
import { DatabaseService } from '@src/database/Database.service';
import { DatabaseModule } from '@src/modules/Database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [StatusAccountController],
  providers: [StatusAccountService, StatusAccountRepository],
})
export class StatusAccountModule {}
