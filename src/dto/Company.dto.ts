import { ApiProperty } from '@nestjs/swagger';
import {
  CreateCompanySchema,
  DeleteCompanySchema,
  UpdateCompanySchema,
  ValidateCodeSchema,
} from '@src/schema/Company.schema';
import { ICompany, ICompanyCode } from '@src/model/Company.model';

export class CreateCompanyDto {
  @ApiProperty({
    description: 'Name of the company',
    example: 'Tech Innovations Inc.',
  })
  name: string;

  @ApiProperty({
    description: 'URL of the company logo or picture',
    example: 'https://example.com/logo.png',
  })
  picture: string;

  @ApiProperty({
    description: 'CNPJ of the company',
    example: '12.345.678/0001-95',
  })
  cnpj: string;

  @ApiProperty({
    description: 'Password for the company account (optional)',
    example: 'SecurePassword123!',
    required: false,
  })
  password?: string;

  @ApiProperty({
    description: 'Area of expertise for the company',
    example: 'Software Development',
  })
  area: string;

  @ApiProperty({
    description: 'Email address of the company',
    example: 'contact@techinnovations.com',
  })
  email: string;

  @ApiProperty({
    description: 'ID of the address associated with the company',
    example: 1,
  })
  address_id: number;

  @ApiProperty({
    description: 'ID of the type of the company',
    example: 1,
  })
  type_id: number;

  @ApiProperty({
    description: 'ID of the status of the company',
    example: 1,
  })
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
  @ApiProperty({
    description: 'Name of the company (optional)',
    example: 'Tech Innovations Inc.',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'URL of the company logo or picture (optional)',
    example: 'https://example.com/logo.png',
    required: false,
  })
  picture?: string;

  @ApiProperty({
    description: 'CNPJ of the company (optional)',
    example: '12.345.678/0001-95',
    required: false,
  })
  cnpj?: string;

  @ApiProperty({
    description: 'Password for the company account (optional)',
    example: 'SecurePassword123!',
    required: false,
  })
  password?: string;

  @ApiProperty({
    description: 'Area of expertise for the company (optional)',
    example: 'Software Development',
    required: false,
  })
  area?: string;

  @ApiProperty({
    description: 'Email address of the company (optional)',
    example: 'contact@techinnovations.com',
    required: false,
  })
  email?: string;

  @ApiProperty({
    description: 'ID of the address associated with the company (optional)',
    example: 1,
    required: false,
  })
  address_id?: number;

  @ApiProperty({
    description: 'ID of the type of the company (optional)',
    example: 1,
    required: false,
  })
  type_id?: number;

  @ApiProperty({
    description: 'ID of the status of the company (optional)',
    example: 1,
    required: false,
  })
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
  @ApiProperty({
    description: 'ID of the company to be deleted',
    example: 123,
  })
  id: number;

  constructor(props: number) {
    this.id = DeleteCompanySchema.id.parse(props);
  }
}

export class ValidateCodeDto {
  @ApiProperty({
    description: 'Validation code for the company',
    example: 456789,
  })
  code: number;

  constructor(props: ICompanyCode) {
    const parsed = ValidateCodeSchema.parse(props);
    this.code = parsed.code;
  }
}
