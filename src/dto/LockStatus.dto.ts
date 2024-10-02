import { ILockStatus } from '@src/model/LockStatus.model';
import {
  CreateLockStatusSchema,
  DeleteLockStatusSchema,
  UpdateLockStatusSchema,
} from '@src/schema/LockStatus.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLockStatusDto {
  @ApiProperty({
    description: 'Name of the lock status',
    example: 'Locked',
  })
  name: string;

  @ApiProperty({
    description: 'Detailed description of the lock status',
    example: 'The item is currently locked and cannot be accessed.',
  })
  description: string;

  constructor(props: ILockStatus) {
    const parsed = CreateLockStatusSchema.parse(props);
    this.name = parsed.name;
    this.description = parsed.description;
  }
}

export class UpdateLockStatusDto {
  @ApiProperty({
    description: 'Name of the lock status (optional)',
    example: 'Unlocked',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'Detailed description of the lock status (optional)',
    example: 'The item is currently unlocked and can be accessed.',
    required: false,
  })
  description?: string;

  constructor(props: Partial<ILockStatus>) { // Accepting a partial type
    const parsed = UpdateLockStatusSchema.parse(props);
    this.name = parsed.name;
    this.description = parsed.description;
  }
}

export class DeleteLockStatusDto {
  @ApiProperty({
    description: 'ID of the lock status to be deleted',
    example: 456,
  })
  id: number;

  constructor(props: number) {
    this.id = DeleteLockStatusSchema.id.parse(props);
  }
}
