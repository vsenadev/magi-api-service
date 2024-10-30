import { Module } from '@nestjs/common';
import { DatabaseService } from '@src/database/Database.service';
import { RandomCode } from '@src/utils/RandomCode.utils';
import { Cryptography } from '@src/utils/Cryptograph.utils';
import { Email } from '@src/utils/Email.utils';
import { ProductController } from '@src/controller/Product.controller';
import { ProductService } from '@src/service/Product.service';
import { ProductRepository } from '@src/repository/Product.repository';
import { DatabaseModule } from '@src/modules/Database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductRepository,
    RandomCode,
    Cryptography,
    Email,
  ],
})
export class ProductModule {}
