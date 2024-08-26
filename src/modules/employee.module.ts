import { Module } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RandomCode } from '../utils/randomCode.utils';
import { Cryptography } from '../utils/cryptograph.utils';
import { Email } from '../utils/Email.utils';
import { EmployeeController } from 'src/controller/employee.controller';
import { EmployeeRepository } from 'src/repository/employee.repository';
import { EmployeeService } from 'src/service/employee.service';

@Module({
  imports: [],
  controllers: [EmployeeController],
  providers: [
    EmployeeService,
    EmployeeRepository,
    DatabaseService,
    RandomCode,
    Cryptography,
    Email,
  ],
})
export class EmployeeModule {}
