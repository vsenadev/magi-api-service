import { Module } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RandomCode } from '../utils/randomCode.utils';
import { Cryptography } from '../utils/cryptograph.utils';
import { Email } from '../utils/Email.utils';
import { ProductController } from 'src/controller/product.controller';

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
