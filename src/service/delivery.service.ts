import { Injectable } from '@nestjs/common';
import { ZodError } from 'zod';
import { ValidationException } from '../exceptions/validation.exception';
import { IReturnMessage } from '../model/returnMessage.model';
import { ValidateCodeDto } from '../dto/Delivery.dto';
import { Cryptography } from '../utils/cryptograph.utils';
import axios from 'axios';
import { DeliveryRepository } from 'src/repository/Delivery.repository';
import {
  CreateDeliveryDto,
  DeleteDeliveryDto,
  UpdateDeliveryDto,
} from 'src/dto/Delivery.dto';
import { IDelivery } from '@src/model/Delivery.model';

@Injectable()
export class DeliveryService {
  constructor(
    private readonly DeliveryRepository: DeliveryRepository,
    private readonly cryptography: Cryptography,
  ) {}

  async createDelivery(data: CreateDeliveryDto): Promise<IReturnMessage> {
    try {
      const newDelivery = new CreateDeliveryDto(data);
      await this.DeliveryRepository.create(newDelivery);
      return { message: 'Entrega criada com sucesso' };
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationException(error);
      } else if (error instanceof ValidationException) {
        return { message: error.message };
      }

      throw error;
    }
  }

  async findAllDeliverys(): Promise<IDelivery[] | object[]> {
    try {
      return await this.DeliveryRepository.findAllDeliverys();
    } catch (error) {
      throw error;
    }
  }

  async findOneDelivery(id: number): Promise<IDelivery | object> {
    try {
      return await this.DeliveryRepository.findOneDelivery(id);
    } catch (error) {
      throw error;
    }
  }

  async updateOneDelivery(
    id: number,
    data: UpdateDeliveryDto,
  ): Promise<IReturnMessage> {
    try {
      const updateDelivery = new UpdateDeliveryDto(data);
      return await this.DeliveryRepository.updateOneDelivery(
        id,
        updateDelivery,
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

  async deleteOneDelivery(id: number): Promise<IReturnMessage> {
    try {
      const deleteDelivery = new DeleteDeliveryDto(id);
      return await this.DeliveryRepository.deleteOneDelivery(deleteDelivery);
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
      const password: object = await this.DeliveryRepository.getCode(id);
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
