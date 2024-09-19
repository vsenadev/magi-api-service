import {
  CreateEmployeeSchema,
  DeleteEmployeeSchema,
  UpdateEmployeeSchema,
} from '@src/schema/Employee.schema';
import { ValidateCodeSchema } from '@src/schema/Employee.schema';
import { IEmployee, IEmployeeCode } from '@src/model/Employee.model';

export class CreateEmployeeDto {
  name: string;
  picture: string;
  company_id: number;
  cpf: string;
  password: string;
  telephone: string;
  email: string;
  status_id: number;
  type_id: number;

  constructor(props: IEmployee) {
    const parsed = CreateEmployeeSchema.parse(props);
    this.name = parsed.name;
    this.picture = parsed.picture;
    this.company_id = parsed.company_id;
    this.cpf = parsed.cpf;
    this.password = parsed.password;
    this.telephone = parsed.phoneNumber;
    this.email = parsed.email;
    this.status_id = parsed.status_id;
    this.type_id = parsed.type_id;
  }
}

export class UpdateEmployeeDto {
  name?: string;
  picture?: string;
  company_id?: number;
  cpf?: string;
  password?: string;
  email?: string;
  type_id?: number;
  status_id?: number;

  constructor(props: IEmployee) {
    const parsed = UpdateEmployeeSchema.parse(props);
    this.name = parsed.name;
    this.company_id = parsed.company_id;
    this.picture = parsed.picture;
    this.password = parsed.password;
    this.cpf = parsed.cpf;
    this.email = parsed.email;
    this.type_id = parsed.type_id;
    this.status_id = parsed.status_id;
  }
}

export class DeleteEmployeeDto {
  id: number;

  constructor(props: number) {
    this.id = DeleteEmployeeSchema.id.parse(props);
  }
}

export class ValidateCodeDto {
  code: number;

  constructor(props: IEmployeeCode) {
    const parsed = ValidateCodeSchema.parse(props);
    this.code = parsed.code;
  }
}
