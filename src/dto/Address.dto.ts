import { ApiProperty } from '@nestjs/swagger';
import { IAddress } from '@src/model/Address.model';
import {
  CreateAddressSchema,
  UpdateAddressSchema,
  DeleteAddressSchema,
} from '@src/schema/Address.schema';

export class CreateAddressDto {
  @ApiProperty({
    description: 'Postal code of the address',
    example: '12345-678',
  })
  cep: string;

  @ApiProperty({
    description: 'Street name of the address',
    example: 'Main St',
  })
  street: string;

  @ApiProperty({
    description: 'Additional information for the address',
    example: 'Apt 101',
    required: false,
  })
  complement?: string;

  @ApiProperty({
    description: 'City of the address',
    example: 'New York',
  })
  city: string;

  @ApiProperty({
    description: 'State of the address',
    example: 'NY',
  })
  state: string;

  @ApiProperty({
    description: 'Street number of the address',
    example: '10',
  })
  number: number;

  constructor(props: IAddress) {
    const parsed = CreateAddressSchema.parse(props);
    this.cep = parsed.cep;
    this.street = parsed.street;
    this.complement = parsed.complement;
    this.city = parsed.city;
    this.state = parsed.state;
    this.number = parseInt(parsed.number);
  }
}

export class UpdateAddressDto {
  @ApiProperty({
    description: 'Postal code of the address (optional)',
    example: '12345-678',
    required: false,
  })
  cep?: string;

  @ApiProperty({
    description: 'Street name of the address (optional)',
    example: 'Main St',
    required: false,
  })
  street?: string;

  @ApiProperty({
    description: 'Additional information for the address (optional)',
    example: 'Apt 101',
    required: false,
  })
  complement?: string;

  @ApiProperty({
    description: 'City of the address (optional)',
    example: 'New York',
    required: false,
  })
  city?: string;

  @ApiProperty({
    description: 'State of the address (optional)',
    example: 'NY',
    required: false,
  })
  state?: string;

  @ApiProperty({
    description: 'Street number of the address (optional)',
    example: '10',
    required: false,
  })
  number?: string;

  constructor(props: IAddress) {
    const parsed = UpdateAddressSchema.parse(props);
    this.cep = parsed.cep;
    this.street = parsed.street;
    this.complement = parsed.complement;
    this.city = parsed.city;
    this.state = parsed.state;
    this.number = parsed.number;
  }
}

export class DeleteAddressDto {
  @ApiProperty({
    description: 'ID of the address to be deleted',
    example: 123,
  })
  id: number;

  constructor(props: number) {
    this.id = DeleteAddressSchema.id.parse(props);
  }
}
