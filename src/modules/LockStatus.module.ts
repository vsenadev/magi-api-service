import { Module } from '@nestjs/common';
import { LockStatusController } from '@src/controller/LockStatus.controller';
import { LockStatusService } from '@src/service/LockStatus.service';
import { LockStatusRepository } from '@src/repository/LockStatus.repository';
import { DatabaseService } from '@src/database/Database.service';
import { DatabaseModule } from '@src/modules/Database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [LockStatusController],
  providers: [LockStatusService, LockStatusRepository],
})
export class LockStatusModule {}
