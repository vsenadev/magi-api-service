import { Injectable } from '@nestjs/common';
import { StatusAccountRepository } from '@src/repository/StatusAccount.repository';
import {
  CreateStatusAccountDto,
  DeleteStatusAccountDto,
  UpdateStatusAccountDto,
} from '@src/dto/StatusAccount.dto';
import { ZodError } from 'zod';
import { ValidationException } from '@src/exceptions/Validation.exception';
import { IReturnMessage } from '@src/model/ReturnMessage.model';
import { IStatusAccount } from '@src/model/StatusAccount.model';

@Injectable()
export class StatusAccountService {
  constructor(
    private readonly statusAccountRepository: StatusAccountRepository,
  ) {}

  async createStatusAccount(
    data: CreateStatusAccountDto,
  ): Promise<IReturnMessage> {
    try {
      const newStatusAccount = new CreateStatusAccountDto(data);
      return await this.statusAccountRepository.create(newStatusAccount);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationException(error);
      } else if (error instanceof ValidationException) {
        return { message: error.message };
      }

      throw error;
    }
  }

  async findAllStatusAccount(): Promise<IStatusAccount[]> {
    try {
      return await this.statusAccountRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async findOneStatusAccount(id: number): Promise<IStatusAccount> {
    try {
      return await this.statusAccountRepository.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  async updateOneStatusAccount(
    id: number,
    data: UpdateStatusAccountDto,
  ): Promise<IReturnMessage> {
    try {
      const updateStatusAccount = new UpdateStatusAccountDto(data);
      return await this.statusAccountRepository.updateOne(
        id,
        updateStatusAccount,
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

  async deleteOneStatusAccount(id: number): Promise<IReturnMessage> {
    try {
      const deleteStatusAccount = new DeleteStatusAccountDto(id);
      return await this.statusAccountRepository.deleteOne(deleteStatusAccount);
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
