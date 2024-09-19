import { Module } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RandomCode } from '../utils/randomCode.utils';
import { Cryptography } from '../utils/cryptograph.utils';
import { Email } from '../utils/Email.utils';
import { ProductController } from '@src/controller/Product.controller';
import { ProductService } from 'src/service/product.service';
import { ProductRepository } from 'src/repository/Product.repository';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductRepository,
    DatabaseService,
    RandomCode,
    Cryptography,
    Email,
  ],
})
export class ProductModule {}
