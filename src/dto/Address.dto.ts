import { IAddress } from '@src/model/Address.model';
import {
  CreateAddressSchema,
  UpdateAddressSchema,
  DeleteAddressSchema,
} from '@src/schema/Address.schema';

export class CreateAddressDto {
  cep: string;
  street: string;
  complement?: string;
  city: string;
  state: string;
  number: string;

  constructor(props: IAddress) {
    const parsed = CreateAddressSchema.parse(props);
    this.cep = parsed.cep;
    this.street = parsed.street;
    this.complement = parsed.complement;
    this.city = parsed.city;
    this.state = parsed.state;
    this.number = parsed.number;
  }
}

export class UpdateAddressDto {
  cep?: string;
  street?: string;
  complement?: string;
  city?: string;
  state?: string;
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
  id: number;

  constructor(props: number) {
    this.id = DeleteAddressSchema.id.parse(props);
  }
}
