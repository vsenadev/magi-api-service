import { Injectable } from '@nestjs/common';
import { TypeAccountRepository } from '@src/repository/TypeAccount.repository';
import {
  CreateTypeAccountDto,
  DeleteTypeAccountDto,
  UpdateTypeAccountDto,
} from '@src/dto/TypeAccount.dto';
import { ZodError } from 'zod';
import { ValidationException } from '@src/exceptions/Validation.exception';
import { IReturnMessage } from '@src/model/ReturnMessage.model';
import { ITypeAccount } from '@src/model/TypeAccount.model';

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
