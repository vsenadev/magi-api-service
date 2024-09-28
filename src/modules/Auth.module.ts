import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '@src/middleware/Auth.service';
import * as process from 'node:process';
import { CompanyRepository } from '@src/repository/Company.repository';
import { EmployeeRepository } from '@src/repository/Employee.repository';
import { DatabaseService } from '@src/database/Database.service';
import { LoginController } from '@src/controller/Login.controller';
import { Cryptography } from '@src/utils/Cryptograph.utils';
import { JwtStrategy } from '@src/middleware/Jwt.strategy';

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
