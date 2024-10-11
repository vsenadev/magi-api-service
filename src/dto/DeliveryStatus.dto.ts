import { ApiProperty } from '@nestjs/swagger';
import { CreateDeliveryStatusSchema, DeleteDeliveryStatusSchema, UpdateDeliveryStatusSchema } from '@src/schema/DeliveryStatus.schema';
import { IDeliveryStatus } from '@src/model/DeliveryStatus.model';

export class CreateDeliveryStatusDto {
  @ApiProperty({
    description: 'Name of the delivery status',
    example: 'Delivered',
  })
  name: string;

  @ApiProperty({
    description: 'Detailed description of the delivery status',
    example: 'The package has been delivered to the customer',
  })
  description: string;

  constructor(props: IDeliveryStatus) {
    const parsed = CreateDeliveryStatusSchema.parse(props);
    this.name = parsed.name;
    this.description = parsed.description;
  }
}

export class UpdateDeliveryStatusDto {
  @ApiProperty({
    description: 'Name of the delivery status (optional)',
    example: 'Shipped',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'Detailed description of the delivery status (optional)',
    example: 'The package has been shipped to the customer',
    required: false,
  })
  description?: string;

  constructor(props: Partial<IDeliveryStatus>) { // Accepting a partial type
    const parsed = UpdateDeliveryStatusSchema.parse(props);
    this.name = parsed.name;
    this.description = parsed.description;
  }
}

export class DeleteDeliveryStatusDto {
  @ApiProperty({
    description: 'ID of the delivery status to be deleted',
    example: 123,
  })
  id: number;

  constructor(props: number) {
    this.id = DeleteDeliveryStatusSchema.id.parse(props);
  }
}
