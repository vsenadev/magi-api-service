import { ApiProperty } from '@nestjs/swagger';
import { IDelivery, IDeliveryCode } from '@src/model/Delivery.model';
import { ValidateCodeSchema } from '@src/schema/Employee.schema';
import {
  CreateDeliverySchema,
  DeleteDeliverySchema,
  UpdateDeliverySchema,
} from '@src/schema/Delivery.schema';

export class CreateDeliveryDto {
  @ApiProperty({
    description: 'Name of the delivery',
    example: 'Package to John Doe',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'ID of the sender',
    example: 1,
    required: false,
  })
  sender?: number;

  @ApiProperty({
    description: 'ID of the recipient',
    example: 2,
    required: false,
  })
  recipient?: number;

  @ApiProperty({
    description: 'Date the package was sent',
    example: '2024-10-01T10:00:00Z',
    required: false,
  })
  send_date?: string;

  @ApiProperty({
    description: 'Expected delivery date',
    example: '2024-10-03T10:00:00Z',
    required: false,
  })
  expected_date?: string;

  @ApiProperty({
    description: 'ID of the delivery status',
    example: 1,
    required: false,
  })
  status_id?: number;

  @ApiProperty({
    description: 'Lock status of the delivery',
    example: 0,
    required: false,
  })
  lock_status?: number;

  @ApiProperty({
    description: 'ID of the delivery route',
    example: 'route-123',
    required: false,
  })
  route_id?: string;

  @ApiProperty({
    description: 'ID of the starting address',
    example: 1,
    required: false,
  })
  startingAddress?: number;

  @ApiProperty({
    description: 'ID of the destination address',
    example: 2,
    required: false,
  })
  destination?: number;

  @ApiProperty({
    description: 'ID of the products included in the delivery',
    example: 3,
    required: false,
  })
  products?: number;

  constructor(props: IDelivery) {
    const parsed = CreateDeliverySchema.parse(props);
    this.name = parsed.name;
    this.sender = parsed.sender;
    this.recipient = parsed.recipient;
    this.send_date = parsed.sendDate;
    this.expected_date = parsed.expectedDate;
    this.status_id = parsed.status_id;
    this.lock_status = parsed.lock_status;
    this.route_id = parsed.route_id;
    this.startingAddress = parsed.startingAddress;
    this.destination = parsed.destination;
    this.products = parsed.products;
  }
}

export class UpdateDeliveryDto {
  @ApiProperty({
    description: 'Name of the delivery (optional)',
    example: 'Package to John Doe',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'ID of the sender (optional)',
    example: 1,
    required: false,
  })
  sender?: number;

  @ApiProperty({
    description: 'ID of the recipient (optional)',
    example: 2,
    required: false,
  })
  recipient?: number;

  @ApiProperty({
    description: 'Date the package was sent (optional)',
    example: '2024-10-01T10:00:00Z',
    required: false,
  })
  send_date?: string;

  @ApiProperty({
    description: 'Expected delivery date (optional)',
    example: '2024-10-03T10:00:00Z',
    required: false,
  })
  expected_date?: string;

  @ApiProperty({
    description: 'ID of the delivery status (optional)',
    example: 1,
    required: false,
  })
  status_id?: number;

  @ApiProperty({
    description: 'Lock status of the delivery (optional)',
    example: 0,
    required: false,
  })
  lock_status?: number;

  @ApiProperty({
    description: 'ID of the delivery route (optional)',
    example: 'route-123',
    required: false,
  })
  route_id?: string;

  @ApiProperty({
    description: 'ID of the starting address (optional)',
    example: 1,
    required: false,
  })
  startingAddress?: number;

  @ApiProperty({
    description: 'ID of the destination address (optional)',
    example: 2,
    required: false,
  })
  destination?: number;

  @ApiProperty({
    description: 'ID of the products included in the delivery (optional)',
    example: 3,
    required: false,
  })
  products?: number;

  constructor(props: IDelivery) {
    const parsed = UpdateDeliverySchema.parse(props);
    this.name = parsed.name;
    this.sender = parsed.sender;
    this.recipient = parsed.recipient;
    this.send_date = parsed.sendDate;
    this.expected_date = parsed.expectedDate;
    this.status_id = parsed.status_id;
    this.lock_status = parsed.lock_status;
    this.route_id = parsed.route_id;
    this.startingAddress = parsed.startingAddress;
    this.destination = parsed.destination;
    this.products = parsed.products;
  }
}

export class DeleteDeliveryDto {
  @ApiProperty({
    description: 'ID of the delivery to be deleted',
    example: 123,
  })
  id: number;

  constructor(props: number) {
    this.id = DeleteDeliverySchema.id.parse(props);
  }
}

export class ValidateCodeDto {
  @ApiProperty({
    description: 'Validation code for the delivery',
    example: 456789,
  })
  code: number;

  constructor(props: IDeliveryCode) {
    const parsed = ValidateCodeSchema.parse(props);
    this.code = parsed.code;
  }
}
