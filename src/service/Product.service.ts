import { Injectable } from '@nestjs/common';
import { ZodError } from 'zod';
import { ValidationException } from '@src/exceptions/Validation.exception';
import { IReturnMessage } from '@src/model/ReturnMessage.model';
import { ValidateCodeDto } from '@src/dto/Product.dto';
import { Cryptography } from '@src/utils/Cryptograph.utils';
import axios from 'axios';
import { ProductRepository } from '@src/repository/Product.repository';
import {
  CreateProductDto,
  DeleteProductDto,
  UpdateProductDto,
} from '@src/dto/Product.dto';
import { IProduct } from '@src/model/Product.model';

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
}
