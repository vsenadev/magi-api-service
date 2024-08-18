import { IStatusAccount } from '../model/statusAccount.model';
import {
  CreateStatusAccountSchema,
  DeleteStatusAccountSchema,
  UpdateStatusAccountSchema,
} from '../schema/statusAccount.schema';

export class CreateStatusAccountDto {
  name: string;
  description: string;

  constructor(props: IStatusAccount) {
    const parsed = CreateStatusAccountSchema.parse(props);
    this.name = parsed.name;
    this.description = parsed.description;
  }
}

export class UpdateStatusAccountDto {
  name?: string;
  description?: string;

  constructor(props: IStatusAccount) {
    const parsed = UpdateStatusAccountSchema.parse(props);
    this.name = parsed.name;
    this.description = parsed.description;
  }
}

export class DeleteStatusAccountDto {
  id: number;

  constructor(props: number) {
    this.id = DeleteStatusAccountSchema.id.parse(props);
  }
}
