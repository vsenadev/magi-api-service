import {
  CreateDeliveryStatusSchema,
  DeleteDeliveryStatusSchema,
  UpdateDeliveryStatusSchema,
} from '@src/schema/DeliveryStatus.schema';
import { IDeliveryStatus } from '@src/model/DeliveryStatus.model';

export class CreateDeliveryStatusDto {
  name: string;
  description: string;

  constructor(props: IDeliveryStatus) {
    const parsed = CreateDeliveryStatusSchema.parse(props);
    this.name = parsed.name;
    this.description = parsed.description;
  }
}

export class UpdateDeliveryStatusDto {
  name?: string;
  description?: string;

  constructor(props: IDeliveryStatus) {
    const parsed = UpdateDeliveryStatusSchema.parse(props);
    this.name = parsed.name;
    this.description = parsed.description;
  }
}

export class DeleteDeliveryStatusDto {
  id: number;

  constructor(props: number) {
    this.id = DeleteDeliveryStatusSchema.id.parse(props);
  }
}
