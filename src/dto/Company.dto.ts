import {
  CreateCompanySchema,
  DeleteCompanySchema,
  UpdateCompanySchema,
  ValidateCodeSchema,
} from '@src/schema/Company.schema';
import { ICompany, ICompanyCode } from '@src/model/Company.model';

export class CreateCompanyDto {
  name: string;
  picture: string;
  cnpj: string;
  password?: string;
  area: string;
  email: string;
  address_id: number;
  type_id: number;
  status_id: number;

  constructor(props: ICompany) {
    const parsed = CreateCompanySchema.parse(props);
    this.name = parsed.name;
    this.picture = parsed.picture;
    this.cnpj = parsed.cnpj;
    this.password = parsed.password;
    this.area = parsed.area;
    this.email = parsed.email;
    this.address_id = parsed.address_id;
    this.type_id = parsed.type_id;
    this.status_id = parsed.status_id;
  }
}

export class UpdateCompanyDto {
  name?: string;
  picture?: string;
  cnpj?: string;
  password?: string;
  area?: string;
  email?: string;
  address_id?: number;
  type_id?: number;
  status_id?: number;

  constructor(props: ICompany) {
    const parsed = UpdateCompanySchema.parse(props);
    this.name = parsed.name;
    this.picture = parsed.picture;
    this.cnpj = parsed.cnpj;
    this.area = parsed.area;
    this.email = parsed.email;
    this.address_id = parsed.address_id;
    this.type_id = parsed.type_id;
    this.status_id = parsed.status_id;
  }
}

export class DeleteCompanyDto {
  id: number;

  constructor(props: number) {
    this.id = DeleteCompanySchema.id.parse(props);
  }
}

export class ValidateCodeDto {
  code: number;

  constructor(props: ICompanyCode) {
    const parsed = ValidateCodeSchema.parse(props);
    this.code = parsed.code;
  }
}
