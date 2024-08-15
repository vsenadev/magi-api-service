import { ILockStatus } from '../model/lockStatus.model';
import {
  CreateLockStatusSchema,
  DeleteLockStatusSchema,
  UpdateLockStatusSchema,
} from '../schema/lockStatus.schema';

export class CreateLockStatusDto {
  name: string;
  description: string;

  constructor(props: ILockStatus) {
    const parsed = CreateLockStatusSchema.parse(props);
    this.name = parsed.name;
    this.description = parsed.description;
  }
}

export class UpdateLockStatusDto {
  name?: string;
  description?: string;

  constructor(props: ILockStatus) {
    const parsed = UpdateLockStatusSchema.parse(props);
    this.name = parsed.name;
    this.description = parsed.description;
  }
}

export class DeleteLockStatusDto {
  id: number;

  constructor(props: number) {
    this.id = DeleteLockStatusSchema.id.parse(props);
  }
}
