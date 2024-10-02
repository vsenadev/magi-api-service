import { IStatusAccount } from '@src/model/StatusAccount.model';
import {
  CreateStatusAccountSchema,
  DeleteStatusAccountSchema,
  UpdateStatusAccountSchema,
} from '@src/schema/StatusAccount.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStatusAccountDto {
  @ApiProperty({
    description: 'Name of the status account',
    example: 'Active',
  })
  name: string;

  @ApiProperty({
    description: 'Description of the status account',
    example: 'The account is currently active.',
  })
  description: string;

  constructor(props: IStatusAccount) {
    const parsed = CreateStatusAccountSchema.parse(props);
    this.name = parsed.name;
    this.description = parsed.description;
  }
}

export class UpdateStatusAccountDto {
  @ApiProperty({
    description: 'Name of the status account (optional)',
    example: 'Inactive',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'Description of the status account (optional)',
    example: 'The account is currently inactive.',
    required: false,
  })
  description?: string;

  constructor(props: Partial<IStatusAccount>) {
    const parsed = UpdateStatusAccountSchema.parse(props);
    this.name = parsed.name;
    this.description = parsed.description;
  }
}

export class DeleteStatusAccountDto {
  @ApiProperty({
    description: 'ID of the status account to be deleted',
    example: 1,
  })
  id: number;

  constructor(props: number) {
    this.id = DeleteStatusAccountSchema.id.parse(props);
  }
}
