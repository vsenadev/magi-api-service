import { Module } from '@nestjs/common';
import { LockStatusController } from '../controller/lockStatus.controller';
import { LockStatusService } from '../service/lockStatus.service';
import { LockStatusRepository } from '../repository/lockStatus.repository';
import { DatabaseService } from '../database/database.service';

@Module({
  imports: [],
  controllers: [LockStatusController],
  providers: [LockStatusService, LockStatusRepository, DatabaseService],
})
export class LockStatusModule {}
