import { IProduct, IProductCode } from '@src/model/Product.model';
import { ValidateCodeSchema } from '@src/schema/Employee.schema';
import {
  CreateProductSchema,
  DeleteProductSchema,
  UpdateProductSchema,
} from '@src/schema/Product.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Name of the product',
    example: 'Product A',
  })
  name: string;

  @ApiProperty({
    description: 'Type of the product',
    example: 'Electronics',
  })
  type: string;

  @ApiProperty({
    description: 'Value of the product',
    example: 99.99,
  })
  value: number;

  @ApiProperty({
    description: 'Length of the product in cm',
    example: 10,
  })
  length: number;

  @ApiProperty({
    description: 'Width of the product in cm',
    example: 5,
  })
  width: number;

  @ApiProperty({
    description: 'Height of the product in cm',
    example: 3,
  })
  height: number;

  @ApiProperty({
    description: 'ID of the company that owns the product',
    example: 1,
  })
  company_id: number;

  constructor(props: IProduct) {
    const parsed = CreateProductSchema.parse(props);
    this.name = parsed.name;
    this.type = parsed.type;
    this.value = parsed.value;
    this.length = parsed.length;
    this.width = parsed.width;
    this.height = parsed.height;
    this.company_id = parsed.company_id;
  }
}

export class UpdateProductDto {
  @ApiProperty({
    description: 'Name of the product (optional)',
    example: 'Updated Product A',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'Type of the product (optional)',
    example: 'Home Appliance',
    required: false,
  })
  type?: string;

  @ApiProperty({
    description: 'Value of the product (optional)',
    example: 79.99,
    required: false,
  })
  value?: number;

  @ApiProperty({
    description: 'Length of the product in cm (optional)',
    example: 12,
    required: false,
  })
  length?: number;

  @ApiProperty({
    description: 'Width of the product in cm (optional)',
    example: 6,
    required: false,
  })
  width?: number;

  @ApiProperty({
    description: 'Height of the product in cm (optional)',
    example: 4,
    required: false,
  })
  height?: number;

  @ApiProperty({
    description: 'ID of the company that owns the product (optional)',
    example: 2,
    required: false,
  })
  company_id?: number;

  constructor(props: Partial<IProduct>) {
    const parsed = UpdateProductSchema.parse(props);
    this.name = parsed.name;
    this.type = parsed.type;
    this.value = parsed.value;
    this.length = parsed.length;
    this.width = parsed.width;
    this.height = parsed.height;
    this.company_id = parsed.company_id;
  }
}

export class DeleteProductDto {
  @ApiProperty({
    description: 'ID of the product to be deleted',
    example: 123,
  })
  id: number;

  constructor(props: number) {
    this.id = DeleteProductSchema.id.parse(props);
  }
}

export class ValidateCodeDto {
  @ApiProperty({
    description: 'Validation code for the product',
    example: 456,
  })
  code: number;

  constructor(props: IProductCode) {
    const parsed = ValidateCodeSchema.parse(props);
    this.code = parsed.code;
  }
}
