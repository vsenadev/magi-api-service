import { Module } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CompanyController } from '../controller/Company.controller';
import { CompanyService } from '../service/company.service';
import { CompanyRepository } from '../repository/company.repository';
import { RandomCode } from '../utils/randomCode.utils';
import { Cryptography } from '../utils/cryptograph.utils';
import { Email } from '../utils/Email.utils';

@Module({
  imports: [],
  controllers: [CompanyController],
  providers: [
    CompanyService,
    CompanyRepository,
    DatabaseService,
    RandomCode,
    Cryptography,
    Email,
  ],
})
export class CompanyModule {}
