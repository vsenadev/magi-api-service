import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '../middleware/auth.service';
import { JwtStrategy } from '../middleware/jwt.strategy';
import * as process from 'node:process';
import { CompanyRepository } from '../repository/company.repository';
import { EmployeeRepository } from '../repository/employee.repository';
import { DatabaseService } from '../database/database.service';
import { LoginController } from '../controller/login.controller';
import { Cryptography } from '../utils/cryptograph.utils';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [LoginController],
  providers: [
    AuthService,
    JwtStrategy,
    CompanyRepository,
    EmployeeRepository,
    DatabaseService,
    Cryptography,
  ],
  exports: [AuthService],
})
export class AuthModule {}
