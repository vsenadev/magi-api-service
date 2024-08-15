import { Injectable } from '@nestjs/common';
import { LockStatusRepository } from '../repository/lockStatus.repository';
import {
  CreateLockStatusDto,
  DeleteLockStatusDto,
  UpdateLockStatusDto,
} from '../dto/lockStatus.dto';
import { ZodError } from 'zod';
import { ValidationException } from '../exceptions/validation.exception';
import { IReturnMessage } from '../model/returnMessage.model';
import { ILockStatus } from '../model/lockStatus.model';

@Injectable()
export class LockStatusService {
  constructor(private readonly lockStatusRepository: LockStatusRepository) {}

  async createLockStatus(data: CreateLockStatusDto): Promise<IReturnMessage> {
    try {
      const newLockStatus = new CreateLockStatusDto(data);
      return await this.lockStatusRepository.create(newLockStatus);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationException(error);
      } else if (error instanceof ValidationException) {
        return { message: error.message };
      }

      throw error;
    }
  }

  async findAllLockStatus(): Promise<ILockStatus[]> {
    try {
      return await this.lockStatusRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async findOneLockStatus(id: number): Promise<ILockStatus> {
    try {
      return await this.lockStatusRepository.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  async updateOneLockStatus(
    id: number,
    data: UpdateLockStatusDto,
  ): Promise<IReturnMessage> {
    try {
      const updateLockStatus = new UpdateLockStatusDto(data);
      return await this.lockStatusRepository.updateOne(id, updateLockStatus);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationException(error);
      } else if (error instanceof ValidationException) {
        return { message: error.message };
      }

      throw error;
    }
  }

  async deleteOneLockStatus(id: number): Promise<IReturnMessage> {
    try {
      const deleteLockStatus = new DeleteLockStatusDto(id);
      return await this.lockStatusRepository.deleteOne(deleteLockStatus);
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
