import { Injectable } from '@nestjs/common';
import {
  CreateDeliveryStatusDto, DeleteDeliveryStatusDto,
  UpdateDeliveryStatusDto
} from "../dto/deliveryStatus.dto";
import { DatabaseService } from '../database/database.service';
import { IReturnMessage } from '../model/returnMessage.model';
import { IDeliveryStatus } from '../model/deliveryStatus.model';
import { IDatabaseReturnModel } from '../model/databaseReturn.model';
import { mountSqlUpdateKeysAndValues } from '../utils/mountSqlUpdateKeysAndValues.utils';

@Injectable()
export class DeliveryStatusRepository {
  constructor(private readonly db: DatabaseService) {}
  async create(data: CreateDeliveryStatusDto): Promise<IReturnMessage> {
    const query =
      'INSERT INTO public.delivery_status (name, description) VALUES ($1, $2)';
    const values = [data.name.toUpperCase(), data.description];

    await this.db.query(query, values);

    return { message: 'Status da entrega criado com sucesso' };
  }

  async findAll(): Promise<IDeliveryStatus[]> {
    const query = 'SELECT * FROM public.delivery_status';
    const result: IDatabaseReturnModel = await this.db.query(query);
    return result.rows;
  }

  async findOne(id: number): Promise<IDeliveryStatus> {
    const query = `SELECT * FROM public.delivery_status WHERE id = ($1)`;
    const param = [id];
    const result: IDatabaseReturnModel = await this.db.query(query, param);

    return result.rows[0];
  }

  async updateOne(
    id: number,
    data: UpdateDeliveryStatusDto,
  ): Promise<IReturnMessage> {
    const { setQuery, queryParams } = await mountSqlUpdateKeysAndValues(
      id,
      data,
    );
    const query = `UPDATE public.delivery_status SET ${setQuery} WHERE id = ($1)`;
    await this.db.query(query, queryParams);
    return { message: 'Status da entrega atualizado com sucesso' };
  }

  async deleteOne(id: DeleteDeliveryStatusDto): Promise<IReturnMessage> {
    const query = 'DELETE FROM public.delivery_status WHERE id = ($1)';
    const param = [id.id];
    await this.db.query(query, param);

    return { message: 'Status da entrega excluído com sucesso' };
  }
}
