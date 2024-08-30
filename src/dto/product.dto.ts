import {
    ValidateCodeSchema
} from "../schema/employee.schema";

export class CreateProductDto {
    name: string;
    type: number;
    value: string;
    lenght: number;
    width: number;
    height: number;
    company_id: number;

    constructor(props: IProduct) {
        const parsed = CreateProductSchema.parse(props);
        this.name = parsed.name;
        this.type = parsed.type;
        this.value = parsed.value;
        this.lenght = parsed.lenght;
        this.width = parsed.width;
        this.height = parsed.height;
        this.company_id = parsed.company_id;
    }
}

export class UpdateProductDto {
    name?: string;
    type?: number;
    value?: string;
    lenght?: number;
    width?: number;
    height?: number;
    company_id?: number;

    constructor(props: IProduct) {
        const parsed = UpdateProductSchema.parse(props);
        this.name = parsed.name;
        this.type = parsed.type;
        this.value = parsed.value;
        this.lenght = parsed.lenght;
        this.width = parsed.width;
        this.height = parsed.height;
        this.company_id = parsed.company_id;
    }
}

export class DeleteProductDto {
    id: number;

    constructor(props: number) {
        this.id = DeleteProductSchema.id.parse(props);
    }
}

export class ValidateCodeDto {
    code: number;

    constructor(props: IProductCode) {
        const parsed = ValidateCodeSchema.parse(props);
        this.code = parsed.code;
    }
}
