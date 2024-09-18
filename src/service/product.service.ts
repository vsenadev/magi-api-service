import { Injectable } from '@nestjs/common';
import { ZodError } from 'zod';
import { ValidationException } from '../exceptions/validation.exception';
import { IReturnMessage } from '../model/returnMessage.model';
import { ValidateCodeDto } from '../dto/Product.dto';
import { Cryptography } from '../utils/cryptograph.utils';
import { Express } from 'express';
import axios from 'axios';
import { ProductRepository } from 'src/repository/Product.repository';
import {
  CreateProductDto,
  DeleteProductDto,
  UpdateProductDto,
} from 'src/dto/Product.dto';
import { IProduct } from 'src/model/Product.model';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly cryptography: Cryptography,
  ) {}

  async createProduct(data: CreateProductDto): Promise<IReturnMessage> {
    try {
      const newProduct = new CreateProductDto(data);
      await this.productRepository.create(newProduct);
      return { message: 'Produto criado com sucesso' };
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationException(error);
      } else if (error instanceof ValidationException) {
        return { message: error.message };
      }

      throw error;
    }
  }

  async findAllProducts(): Promise<IProduct[] | object[]> {
    try {
      return await this.productRepository.findAllProducts();
    } catch (error) {
      throw error;
    }
  }

  async findOneProduct(id: number): Promise<IProduct | object> {
    try {
      return await this.productRepository.findOneProduct(id);
    } catch (error) {
      throw error;
    }
  }

  async updateOneProduct(
    id: number,
    data: UpdateProductDto,
  ): Promise<IReturnMessage> {
    try {
      const updateProduct = new UpdateProductDto(data);
      return await this.productRepository.updateOneProduct(id, updateProduct);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationException(error);
      } else if (error instanceof ValidationException) {
        return { message: error.message };
      }

      throw error;
    }
  }

  async deleteOneProduct(id: number): Promise<IReturnMessage> {
    try {
      const deleteProduct = new DeleteProductDto(id);
      return await this.productRepository.deleteOneProduct(deleteProduct);
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
      const password: object = await this.productRepository.getCode(id);
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
