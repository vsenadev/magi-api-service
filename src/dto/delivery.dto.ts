import { IDelivery, IDeliveryCode } from "src/model/Delivery.model";
import {
    ValidateCodeSchema
} from "../schema/employee.schema";
import { CreateDeliverySchema, DeleteDeliverySchema, UpdateDeliverySchema } from "src/schema/delivery.schema";

export class CreateDeliveryDto {
    name?: string;
    sender?: number;
    recipient?: number;
    send_date?: string;
    expected_date?: string;
    status_id?: number;
    lock_status?: number;
    route_id?: string;
    startingAddress?: number;
    destination?: number;
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
    name?: string;
    sender?: number;
    recipient?: number;
    send_date?: string;
    expected_date?: string;
    status_id?: number;
    lock_status?: number;
    route_id?: string;
    startingAddress?: number;
    destination?: number;
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
    id: number;

    constructor(props: number) {
        this.id = DeleteDeliverySchema.id.parse(props);
    }
}

export class ValidateCodeDto {
    code: number;

    constructor(props: IDeliveryCode) {
        const parsed = ValidateCodeSchema.parse(props);
        this.code = parsed.code;
    }
}
