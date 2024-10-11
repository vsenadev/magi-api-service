import {
  CreateEmployeeSchema,
  DeleteEmployeeSchema,
  UpdateEmployeeSchema,
} from '@src/schema/Employee.schema';
import { ValidateCodeSchema } from '@src/schema/Employee.schema';
import { IEmployee, IEmployeeCode } from '@src/model/Employee.model';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty({
    description: 'Name of the employee',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'Profile picture URL of the employee',
    example: 'https://example.com/picture.jpg',
  })
  picture: string;

  @ApiProperty({
    description: 'ID of the associated company',
    example: 1,
  })
  company_id: number;

  @ApiProperty({
    description: 'Employee CPF',
    example: '123.456.789-00',
  })
  cpf: string;

  @ApiProperty({
    description: 'Password for employee login',
    example: 'securePassword123',
  })
  password: string;

  @ApiProperty({
    description: 'Telephone number of the employee',
    example: '(11) 91234-5678',
  })
  telephone: string;

  @ApiProperty({
    description: 'Email address of the employee',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Status ID of the employee',
    example: 1,
  })
  status_id: number;

  @ApiProperty({
    description: 'Type ID of the employee',
    example: 1,
  })
  type_id: number;

  constructor(props: IEmployee) {
    const parsed = CreateEmployeeSchema.parse(props);
    this.name = parsed.name;
    this.picture = parsed.picture;
    this.company_id = parsed.company_id;
    this.cpf = parsed.cpf;
    this.password = parsed.password;
    this.telephone = parsed.phoneNumber; // Ensure consistent naming
    this.email = parsed.email;
    this.status_id = parsed.status_id;
    this.type_id = parsed.type_id;
  }
}

export class UpdateEmployeeDto {
  @ApiProperty({
    description: 'Name of the employee (optional)',
    example: 'John Doe',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'Profile picture URL of the employee (optional)',
    example: 'https://example.com/picture.jpg',
    required: false,
  })
  picture?: string;

  @ApiProperty({
    description: 'ID of the associated company (optional)',
    example: 1,
    required: false,
  })
  company_id?: number;

  @ApiProperty({
    description: 'Employee CPF (optional)',
    example: '123.456.789-00',
    required: false,
  })
  cpf?: string;

  @ApiProperty({
    description: 'Password for employee login (optional)',
    example: 'securePassword123',
    required: false,
  })
  password?: string;

  @ApiProperty({
    description: 'Email address of the employee (optional)',
    example: 'john.doe@example.com',
    required: false,
  })
  email?: string;

  @ApiProperty({
    description: 'Type ID of the employee (optional)',
    example: 1,
    required: false,
  })
  type_id?: number;

  @ApiProperty({
    description: 'Status ID of the employee (optional)',
    example: 1,
    required: false,
  })
  status_id?: number;

  constructor(props: Partial<IEmployee>) {
    // Accepting a partial type
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
  @ApiProperty({
    description: 'ID of the employee to be deleted',
    example: 123,
  })
  id: number;

  constructor(props: number) {
    this.id = DeleteEmployeeSchema.id.parse(props);
  }
}

export class ValidateCodeDto {
  @ApiProperty({
    description: 'Validation code for the employee',
    example: 123456,
  })
  code: number;

  constructor(props: IEmployeeCode) {
    const parsed = ValidateCodeSchema.parse(props);
    this.code = parsed.code;
  }
}
