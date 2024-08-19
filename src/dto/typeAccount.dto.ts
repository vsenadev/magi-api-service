import { ITypeAccount } from '../model/typeAccount.model';
import {
  CreateTypeAccountSchema,
  DeleteTypeAccountSchema,
  UpdateTypeAccountSchema,
} from '../schema/typeAccount.schema';

export class CreateTypeAccountDto {
  name: string;
  description: string;

  constructor(props: ITypeAccount) {
    const parsed = CreateTypeAccountSchema.parse(props);
    this.name = parsed.name;
    this.description = parsed.description;
  }
}

export class UpdateTypeAccountDto {
  name?: string;
  description?: string;

  constructor(props: ITypeAccount) {
    const parsed = UpdateTypeAccountSchema.parse(props);
    this.name = parsed.name;
    this.description = parsed.description;
  }
}

export class DeleteTypeAccountDto {
  id: number;

  constructor(props: number) {
    this.id = DeleteTypeAccountSchema.id.parse(props);
  }
}
