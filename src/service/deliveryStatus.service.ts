import { Injectable } from '@nestjs/common';
import { DeliveryStatusRepository } from '../repository/deliveryStatus.repository';
import {
  CreateDeliveryStatusDto,
  DeleteDeliveryStatusDto,
  UpdateDeliveryStatusDto,
} from '../dto/deliveryStatus.dto';
import { ZodError } from 'zod';
import { ValidationException } from '../exceptions/validation.exception';
import { IReturnMessage } from '../model/returnMessage.model';
import { IDeliveryStatus } from '../model/deliveryStatus.model';

@Injectable()
export class DeliveryStatusService {
  constructor(
    private readonly deliveryStatusRepository: DeliveryStatusRepository,
  ) {}

  async createDeliveryStatus(
    data: CreateDeliveryStatusDto,
  ): Promise<IReturnMessage> {
    try {
      const newDeliveryStatus = new CreateDeliveryStatusDto(data);
      return await this.deliveryStatusRepository.create(newDeliveryStatus);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationException(error);
      } else if (error instanceof ValidationException) {
        return { message: error.message };
      }

      throw error;
    }
  }

  async findAllDeliveryStatus(): Promise<IDeliveryStatus[]> {
    try {
      return await this.deliveryStatusRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async findOneDeliveryStatus(id: number): Promise<IDeliveryStatus> {
    try {
      return await this.deliveryStatusRepository.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  async updateOneDeliveryStatus(
    id: number,
    data: UpdateDeliveryStatusDto,
  ): Promise<IReturnMessage> {
    try {
      const updateDeliveryStatus = new UpdateDeliveryStatusDto(data);
      return await this.deliveryStatusRepository.updateOne(
        id,
        updateDeliveryStatus,
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

  async deleteOneDeliveryStatus(id: number): Promise<IReturnMessage> {
    try {
      const deleteDeliveryStatus = new DeleteDeliveryStatusDto(id);
      return await this.deliveryStatusRepository.deleteOne(
        deleteDeliveryStatus,
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
}
