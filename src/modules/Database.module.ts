import { Module } from '@nestjs/common';
import { DatabaseService } from '@src/database/Database.service';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
