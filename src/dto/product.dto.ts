import { IProduct, IProductCode } from 'src/model/product.model';
import { ValidateCodeSchema } from '../schema/employee.schema';
import {
  CreateProductSchema,
  DeleteProductSchema,
  UpdateProductSchema,
} from 'src/schema/product.schema';

export class CreateProductDto {
  name: string;
  type: string;
  value: number;
  length: number;
  width: number;
  height: number;
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
  name?: string;
  type?: string;
  value?: number;
  lenght?: number;
  width?: number;
  height?: number;
  company_id?: number;

  constructor(props: IProduct) {
    const parsed = UpdateProductSchema.parse(props);
    this.name = parsed.name;
    this.type = parsed.type;
    this.value = parsed.value;
    this.lenght = parsed.length;
    this.width = parsed.width;
    this.height = parsed.height;
    this.company_id = parsed.company_id;
  }
}

export class DeleteProductDto {
  id: number;

  constructor(props: number) {
    this.id = DeleteProductSchema.id.parse(props);
  }
}

export class ValidateCodeDto {
  code: number;

  constructor(props: IProductCode) {
    const parsed = ValidateCodeSchema.parse(props);
    this.code = parsed.code;
  }
}
