import { IProductDelivery, IProductDeliveryCode } from "src/model/productDelivery.model";
import { CreateProductDeliverySchema, DeleteProductDeliverySchema, UpdateProductDeliverySchema, ValidateCodeSchema } from "src/schema/productDelivery.schema";

  export class CreateProductDeliveryDto {
    product_id: number;
    delivery_id: number;
    amount: number;
  
    constructor(props: IProductDelivery) {
      const parsed = CreateProductDeliverySchema.parse(props);
      this.product_id = parsed.product_id;
      this.delivery_id = parsed.delivery_id;
      this.amount = parsed.amount;
    }
  }
  
  export class UpdateProductDeliveryDto {
    product_id?: number;
    delivery_id?: number;
    amount?: number;
  
    constructor(props: IProductDelivery) {
      const parsed = UpdateProductDeliverySchema.parse(props);
      this.product_id = parsed.product_id;
      this.delivery_id = parsed.delivery_id;
      this.amount = parsed.amount;
    }
  }
  
  export class DeleteProductDeliveryDto {
    id: number;
  
    constructor(props: number) {
      this.id = DeleteProductDeliverySchema.id.parse(props);
    }
  }
  
  export class ValidateCodeDto {
    code: number;
  
    constructor(props: IProductDeliveryCode) {
      const parsed = ValidateCodeSchema.parse(props);
      this.code = parsed.code;
    }
  }
  