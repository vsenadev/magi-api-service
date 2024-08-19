import { Injectable } from '@nestjs/common';
import { TypeAccountRepository } from '../repository/typeAccount.repository';
import {
  CreateTypeAccountDto,
  DeleteTypeAccountDto,
  UpdateTypeAccountDto,
} from '../dto/typeAccount.dto';
import { ZodError } from 'zod';
import { ValidationException } from '../exceptions/validation.exception';
import { IReturnMessage } from '../model/returnMessage.model';
import { ITypeAccount } from '../model/typeAccount.model';

@Injectable()
export class TypeAccountService {
  constructor(private readonly typeAccountRepository: TypeAccountRepository) {}

  async createTypeAccount(data: CreateTypeAccountDto): Promise<IReturnMessage> {
    try {
      const newTypeAccount = new CreateTypeAccountDto(data);
      return await this.typeAccountRepository.create(newTypeAccount);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationException(error);
      } else if (error instanceof ValidationException) {
        return { message: error.message };
      }

      throw error;
    }
  }

  async findAllTypeAccount(): Promise<ITypeAccount[]> {
    try {
      return await this.typeAccountRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async findOneTypeAccount(id: number): Promise<ITypeAccount> {
    try {
      return await this.typeAccountRepository.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  async updateOneTypeAccount(
    id: number,
    data: UpdateTypeAccountDto,
  ): Promise<IReturnMessage> {
    try {
      const updateTypeAccount = new UpdateTypeAccountDto(data);
      return await this.typeAccountRepository.updateOne(id, updateTypeAccount);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationException(error);
      } else if (error instanceof ValidationException) {
        return { message: error.message };
      }

      throw error;
    }
  }

  async deleteOneTypeAccount(id: number): Promise<IReturnMessage> {
    try {
      const deleteTypeAccount = new DeleteTypeAccountDto(id);
      return await this.typeAccountRepository.deleteOne(deleteTypeAccount);
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
