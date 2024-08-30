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
import { IReturnMessage } from '../model/returnMessage.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { IProduct } from 'src/model/product.model';
import { ProductService } from 'src/service/product.service';
import { CreateProductDto, UpdateProductDto, ValidateCodeDto } from 'src/dto/Product.dto';


@Controller('api/v1/product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    async createProduct(@Body() body: CreateProductDto): Promise<IReturnMessage> {
        return await this.productService.createProduct(body);
    }

    @Get()
    async findAllProduct(): Promise<IProduct[]> {
        return await this.productService.findAllProducts();
    }

    @Get(':id')
    async findOneProduct(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<IProduct> {
        return await this.productService.findOneProduct(id);
    }

    @Put(':id')
    async updateOnProduct(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateBody: UpdateProductDto,
    ): Promise<IReturnMessage> {
        return await this.productService.updateOneProduct(id, updateBody);
    }

    @Delete(':id')
    async deleteOneProduct(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<IReturnMessage> {
        return await this.productService.deleteOneProduct(id);
    }

    @Put('code/:id')
    async validateCode(
        @Param('id', ParseIntPipe) id: number,
        @Body() codeBody: ValidateCodeDto,
    ): Promise<IReturnMessage | boolean> {
        return await this.productService.validateCode(id, codeBody);
    }

    @Put('/picture/:id')
    @UseInterceptors(FileInterceptor('image'))
    uploadImage(
        @UploadedFile() image: Express.Multer.File,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.productService.uploadImage(id, image);
    }
}
