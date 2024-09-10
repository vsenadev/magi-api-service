import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { IReturnMessage } from '../model/returnMessage.model';
import { IDatabaseReturnModel } from '../model/databaseReturn.model';
import { mountSqlUpdateKeysAndValues } from '../utils/mountSqlUpdateKeysAndValues.utils';
import { CreateProductDeliveryDto, DeleteProductDeliveryDto, UpdateProductDeliveryDto } from 'src/dto/ProductDelivery.dto';
import { IProductDelivery } from 'src/model/ProductDelivery.model';

@Injectable()
export class ProductDeliveryRepository {
  constructor(private readonly db: DatabaseService) {}
  async create(data: CreateProductDeliveryDto): Promise<IReturnMessage> {
    const query =
      'INSERT INTO public.product_delivery (product_id, delivery_id, amount) values ($1, $2, $3)';
    const values = [
      data.product_id,
      data.delivery_id,
      data.amount
    ];

    await this.db.query(query, values);

    return { message: 'Entrega do produto criado com sucesso' };
  }

  async findAllProductDeliverys(): Promise<IProductDelivery[] | object[]> {
    const query =
      'SELECT pd.id, pd.product_id, pd.delivery_id, pd.amount AS ProductDelivery_informations FROM public.product_delivery AS pd JOIN public.product AS p ON p.id = pd.product_id JOIN public.delivery AS d ON d.id = pd.delivery_id';    
      const result: IDatabaseReturnModel = await this.db.query(query);

    return result.rows;
  }

  async findOneProductDelivery(id: number): Promise<IProductDelivery | object> {
    const query =
      "SELECT pd.id, pd.product_id, pd.delivery_id, pd.amount AS ProductDelivery_informations FROM public.product_delivery AS pd JOIN public.product AS p ON p.id = pd.product_id JOIN public.delivery AS d ON d.id = pd.delivery_id WHERE pd.id = ($1);"
      const param = [id];
    const result: IDatabaseReturnModel = await this.db.query(query, param);

    return result.rows[0];
  }

  async updateOneProductDelivery(id: number, data: UpdateProductDeliveryDto): Promise<IReturnMessage> {
    const { setQuery, queryParams } = await mountSqlUpdateKeysAndValues(
      id,
      data,
    );
    const query = `UPDATE public.product_delivery SET ${setQuery} WHERE id = ($1)`;
    await this.db.query(query, queryParams);

    return { message: 'Entrega do produto atualizado com sucesso' };
  }

  async deleteOneProductDelivery(dto: DeleteProductDeliveryDto): Promise<IReturnMessage> {
    const query = 'DELETE FROM public.product_delivery AS p WHERE p.id = ($1)';
    const param = [dto.id]; 
    await this.db.query(query, param);

    return { message: 'Entrega do produto excluído com sucesso' };
}


  async getCode(id: number): Promise<IReturnMessage | object> {
    const query = `DELETE FROM public.product_delivery WHERE p.id = ($1)`;
    const param = [id];
    const result: IDatabaseReturnModel = await this.db.query(query, param);

    return result.rows[0];
  }
}
