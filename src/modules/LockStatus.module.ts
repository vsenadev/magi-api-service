import { Module } from '@nestjs/common';
import { LockStatusController } from '@src/controller/LockStatus.controller';
import { LockStatusService } from '@src/service/LockStatus.service';
import { LockStatusRepository } from '@src/repository/LockStatus.repository';
import { DatabaseService } from '@src/database/Database.service';

@Module({
  imports: [],
  controllers: [LockStatusController],
  providers: [LockStatusService, LockStatusRepository, DatabaseService],
})
export class LockStatusModule {}
