import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ValidateLoginDto } from '../dto/login.dto';
import { ZodError } from 'zod';
import { ValidationException } from '../exceptions/validation.exception';
import { ILogin } from '../model/login.model';
import { CompanyRepository } from '../repository/company.repository';
import { EmployeeRepository } from '../repository/employee.repository';
import { IReturnMessage } from '../model/returnMessage.model';
import { Cryptography } from '../utils/cryptograph.utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly companyRepository: CompanyRepository,
    private readonly employeeRepository: EmployeeRepository,
    private readonly cryptograph: Cryptography,
  ) {}

  generateToken(email: string, role: number): string {
    const payload = { email, role };
    return this.jwtService.sign(payload);
  }

  async validateUser(data: ValidateLoginDto): Promise<IReturnMessage> {
    try {
      const accountData = new ValidateLoginDto(data);
      const validation: ILogin | undefined = await this.findUser(accountData);
      if (
        validation &&
        validation.status_id === 1 &&
        (await this.cryptograph.comparePassword(
          data.password,
          validation.password,
        ))
      ) {
        return {
          status: true,
          message: {
            token: this.generateToken(validation.email, validation.type_id),
          },
        };
      } else {
        return { status: false, message: 'Conta inválida' };
      }
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationException(error);
      } else if (error instanceof ValidationException) {
        return { message: error.message };
      }

      throw error;
    }
  }

  private async findUser(data: ILogin): Promise<object> {
    if (data.type) {
      return await this.companyRepository.validateUser(data.email);
    } else if (!data.type) {
      return await this.employeeRepository.validateUser(data.email);
    }
  }
}
