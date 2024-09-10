import { Injectable } from '@nestjs/common';
import { ZodError } from 'zod';
import { ValidationException } from '../exceptions/validation.exception';
import { IReturnMessage } from '../model/returnMessage.model';
import {
  ValidateCodeDto,
} from '../dto/ProductDelivery.dto';
import { Cryptography } from '../utils/cryptograph.utils';
import { Express } from 'express';
import axios from 'axios';
import { ProductDeliveryRepository } from 'src/repository/ProductDelivery.repository';
import { CreateProductDeliveryDto, DeleteProductDeliveryDto, UpdateProductDeliveryDto } from 'src/dto/ProductDelivery.dto';
import { IProductDelivery } from 'src/model/ProductDelivery.model';

@Injectable()
export class ProductDeliveryService {
  constructor(
    private readonly ProductDeliveryRepository: ProductDeliveryRepository,
    private readonly cryptography: Cryptography,
  ) {}

  async createProductDelivery(data: CreateProductDeliveryDto): Promise<IReturnMessage> {
    try {
      const newProductDelivery = new CreateProductDeliveryDto(data);
      await this.ProductDeliveryRepository.create(newProductDelivery);
      return { message: 'Entrega do produto criado com sucesso' };
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationException(error);
      } else if (error instanceof ValidationException) {
        return { message: error.message };
      }

      throw error;
    }
  }

  async findAllProductDeliverys(): Promise<IProductDelivery[] | object[]> {
    try {
      return await this.ProductDeliveryRepository.findAllProductDeliverys();
    } catch (error) {
      throw error;
    }
  }

  async findOneProductDelivery(id: number): Promise<IProductDelivery | object> {
    try {
      return await this.ProductDeliveryRepository.findOneProductDelivery(id);
    } catch (error) {
      throw error;
    }
  }

  async updateOneProductDelivery(
    id: number,
    data: UpdateProductDeliveryDto,
  ): Promise<IReturnMessage> {
    try {
      const updateProductDelivery = new UpdateProductDeliveryDto(data);
      return await this.ProductDeliveryRepository.updateOneProductDelivery(id, updateProductDelivery);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationException(error);
      } else if (error instanceof ValidationException) {
        return { message: error.message };
      }

      throw error;
    }
  }

  async deleteOneProductDelivery(id: number): Promise<IReturnMessage> {
    try {
      const deleteProductDelivery = new DeleteProductDeliveryDto(id);
      return await this.ProductDeliveryRepository.deleteOneProductDelivery(deleteProductDelivery);
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
      const password: object = await this.ProductDeliveryRepository.getCode(id);
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
