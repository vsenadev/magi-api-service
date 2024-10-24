import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@src/database/Database.service';
import { IReturnMessage } from '@src/model/ReturnMessage.model';
import { IDatabaseReturnModel } from '@src/model/DatabaseReturn.model';
import { mountSqlUpdateKeysAndValues } from '@src/utils/MountSqlUpdateKeysAndValues.utils';
import {
  CreateProductDto,
  DeleteProductDto,
  UpdateProductDto,
} from '@src/dto/Product.dto';
import { IProduct } from '@src/model/Product.model';

@Injectable()
export class ProductRepository {
  constructor(private readonly db: DatabaseService) {}
  async create(data: CreateProductDto): Promise<IReturnMessage> {
    const query =
      'INSERT INTO public.Product (name, type, value, lenght, width, height, company_id) values ($1, $2, $3, $4, $5, $6, $7)';
    const values = [
      data.name.toUpperCase(),
      data.type,
      data.value,
      data.length,
      data.width,
      data.height,
      data.company_id,
    ];

    await this.db.query(query, values);

    return { message: 'Produto criado com sucesso' };
  }

  async findAllProducts(): Promise<IProduct[] | object[]> {
    const query =
      'SELECT p.id, p.name, p.lenght, p.width, p.height AS Product_informations FROM public.Product AS p JOIN public.company AS c ON c.id = p.company_id WHERE c.id = p.company_id;';
    const result: IDatabaseReturnModel = await this.db.query(query);

    return result.rows;
  }

  async findOneProduct(id: number): Promise<IProduct | object> {
    const query =
      'SELECT p.id, p.name, p.lenght, p.width, p.height AS Product_informations FROM public.Product AS p JOIN public.company AS c ON c.id = p.company_id WHERE c.id = ($1);';
    const param = [id];
    const result: IDatabaseReturnModel = await this.db.query(query, param);

    return result.rows[0];
  }

  async updateOneProduct(
    id: number,
    data: UpdateProductDto,
  ): Promise<IReturnMessage> {
    const { setQuery, queryParams } = await mountSqlUpdateKeysAndValues(
      id,
      data,
    );
    const query = `UPDATE public.product SET ${setQuery} WHERE id = ($1)`;
    await this.db.query(query, queryParams);

    return { message: 'Produto atualizado com sucesso' };
  }

  async deleteOneProduct(dto: DeleteProductDto): Promise<IReturnMessage> {
    const query = 'DELETE FROM public.Product AS p WHERE p.id = ($1)';
    const param = [dto.id]; // Extract the ID from the DTO
    await this.db.query(query, param);

    return { message: 'Produto excluído com sucesso' };
  }
}
