import { ITypeAccount } from '@src/model/TypeAccount.model';
import {
  CreateTypeAccountSchema,
  DeleteTypeAccountSchema,
  UpdateTypeAccountSchema,
} from '@src/schema/TypeAccount.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTypeAccountDto {
  @ApiProperty({
    description: 'Name of the account type',
    example: 'Admin',
  })
  name: string;

  @ApiProperty({
    description: 'Description of the account type',
    example: 'Administrator account with full access.',
  })
  description: string;

  constructor(props: ITypeAccount) {
    const parsed = CreateTypeAccountSchema.parse(props);
    this.name = parsed.name;
    this.description = parsed.description;
  }
}

export class UpdateTypeAccountDto {
  @ApiProperty({
    description: 'Name of the account type (optional)',
    example: 'User',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'Description of the account type (optional)',
    example: 'Regular user account with limited access.',
    required: false,
  })
  description?: string;

  constructor(props: Partial<ITypeAccount>) {
    const parsed = UpdateTypeAccountSchema.parse(props);
    this.name = parsed.name;
    this.description = parsed.description;
  }
}

export class DeleteTypeAccountDto {
  @ApiProperty({
    description: 'ID of the account type to be deleted',
    example: 1,
  })
  id: number;

  constructor(props: number) {
    this.id = DeleteTypeAccountSchema.id.parse(props);
  }
}
