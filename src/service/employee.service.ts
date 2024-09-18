import { Injectable } from '@nestjs/common';
import { ZodError } from 'zod';
import { ValidationException } from '../exceptions/validation.exception';
import { IReturnMessage } from '../model/returnMessage.model';
import { ValidateCodeDto } from '../dto/employee.dto';
import { RandomCode } from '../utils/randomCode.utils';
import { Cryptography } from '../utils/cryptograph.utils';
import { Email } from '../utils/Email.utils';
import { Express } from 'express';
import axios from 'axios';
import { EmployeeRepository } from 'src/repository/employee.repository';
import {
  CreateEmployeeDto,
  DeleteEmployeeDto,
  UpdateEmployeeDto,
} from 'src/dto/employee.dto';
import { IEmployee } from 'src/model/employee.model';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly codeGenerator: RandomCode,
    private readonly cryptography: Cryptography,
    private readonly email: Email,
  ) {}

  async createEmployee(data: CreateEmployeeDto): Promise<IReturnMessage> {
    try {
      const codeGenerated = this.codeGenerator.generateRandomPassword();
      data['password'] = await this.cryptography.hashPassword(codeGenerated);
      const newEmployee = new CreateEmployeeDto(data);
      await this.employeeRepository.create(newEmployee);
      await this.email.sendEmailWithCode(
        data.email,
        'Defina Sua Primeira Senha!',
        data.name,
        codeGenerated,
      );
      return { message: 'Funcionário criada com sucesso' };
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationException(error);
      } else if (error instanceof ValidationException) {
        return { message: error.message };
      }

      throw error;
    }
  }

  async findAllEmployees(): Promise<IEmployee[] | object[]> {
    try {
      return await this.employeeRepository.findAllEmployees();
    } catch (error) {
      throw error;
    }
  }

  async findOneEmployee(id: number): Promise<IEmployee | object> {
    try {
      return await this.employeeRepository.findOneEmployee(id);
    } catch (error) {
      throw error;
    }
  }

  async updateOneEmployee(
    id: number,
    data: UpdateEmployeeDto,
  ): Promise<IReturnMessage> {
    try {
      const updateEmployee = new UpdateEmployeeDto(data);
      return await this.employeeRepository.updateOneEmployee(
        id,
        updateEmployee,
      );
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationException(error);
      } else if (error instanceof ValidationException) {
        return { message: error.message };
      }

      throw error;
    }
  }

  async deleteOneEmployee(id: number): Promise<IReturnMessage> {
    try {
      const deleteEmployee = new DeleteEmployeeDto(id);
      return await this.employeeRepository.deleteOneEmployee(deleteEmployee);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationException(error);
      } else if (error instanceof ValidationException) {
        return { message: error.message };
      }

      throw error;
    }
  }

  async validateCode(
    id: number,
    data: ValidateCodeDto,
  ): Promise<boolean | IReturnMessage> {
    try {
      const password: object = await this.employeeRepository.getCode(id);
      return await this.cryptography.comparePassword(
        data.code.toString(),
        password['password'],
      );
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationException(error);
      } else if (error instanceof ValidationException) {
        return { message: error.message };
      }

      throw error;
    }
  }

  async uploadImage(id: number, file: Express.Multer.File) {
    try {
      const formData = new FormData();
      const imageBase64 = file.buffer.toString('base64');

      formData.append('key', process.env.IMAGE_BB_KEY);
      formData.append('image', imageBase64);

      const imageUrl = await axios.post(
        'https://api.imgbb.com/1/upload',
        formData,
      );

      await this.employeeRepository.updateOneEmployee(id, {
        picture: imageUrl.data['data']['image']['url'],
      });

      return { message: 'Imagem alterada com sucesso' };
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationException(error);
      } else if (error instanceof ValidationException) {
        return { message: error.message };
      }

      throw error;
    }
  }
}
