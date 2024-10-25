import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { IReturnMessage } from '@src/model/ReturnMessage.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { IProduct } from '@src/model/Product.model';
import { ProductService } from '@src/service/Product.service';
import {
  CreateProductDto,
  UpdateProductDto,
  ValidateCodeDto,
} from '@src/dto/Product.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('v1/product')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created successfully.' })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: Invalid product data.',
  })
  @ApiBody({ type: CreateProductDto })
  async createProduct(@Body() body: CreateProductDto): Promise<IReturnMessage> {
    return await this.productService.createProduct(body);
  }

  @Get('/company/:id')
  @ApiOperation({ summary: 'Retrieve all products' })
  @ApiResponse({
    status: 200,
    description: 'List of all products retrieved successfully.',
  })
  async findAllProduct(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IProduct[]> {
    return await this.productService.findAllProducts(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a product by ID' })
  @ApiResponse({ status: 200, description: 'Product retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Not Found: Product not found.' })
  async findOneProduct(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IProduct> {
    return await this.productService.findOneProduct(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiResponse({ status: 200, description: 'Product updated successfully.' })
  @ApiResponse({ status: 404, description: 'Not Found: Product not found.' })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: Invalid product data.',
  })
  @ApiBody({ type: UpdateProductDto })
  async updateOnProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBody: UpdateProductDto,
  ): Promise<IReturnMessage> {
    return await this.productService.updateOneProduct(id, updateBody);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Not Found: Product not found.' })
  async deleteOneProduct(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IReturnMessage> {
    return await this.productService.deleteOneProduct(id);
  }
}
