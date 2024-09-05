import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { IReturnMessage } from '../model/returnMessage.model';
import { IDatabaseReturnModel } from '../model/databaseReturn.model';
import { mountSqlUpdateKeysAndValues } from '../utils/mountSqlUpdateKeysAndValues.utils';
import {
  CreateDeliveryDto,
  DeleteDeliveryDto,
  UpdateDeliveryDto,
} from 'src/dto/Delivery.dto';
import { IDelivery } from 'src/model/Delivery.model';

@Injectable()
export class DeliveryRepository {
  constructor(private readonly db: DatabaseService) {}
  async create(data: CreateDeliveryDto): Promise<IReturnMessage> {
    const query =
      'INSERT INTO public.delivery ("name", "sender", "recipient", "send_date", "expected_date", "status_id", "lock_status", "route_id", "startingAddress", "destination", "products") values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';

    const values = [
      data.name.toUpperCase(),
      data.sender,
      data.recipient,
      data.send_date,
      data.expected_date,
      data.status_id,
      data.lock_status,
      data.route_id,
      data.startingAddress,
      data.destination,
      data.products,
    ];

    await this.db.query(query, values);

    return { message: 'Entrega criada com sucesso' };
  }

  async findAllDeliverys(): Promise<IDelivery[] | object[]> {
    const query =
      'SELECT d.id, d.name, s.name AS sender_name, r.name AS recipient_name, d.send_date, d.expected_date, ds.name AS status, ls.name AS lock_status, d.route_id, sa.street AS "startingAddress", da.street AS destination_address, array_agg(p.name) AS products FROM public.delivery AS d JOIN public.employee AS s ON s.id = d.sender JOIN public.employee AS r ON r.id = d.recipient JOIN public.delivery_status AS ds ON ds.id = d.status_id JOIN public.lock_status AS ls ON ls.id = d.lock_status JOIN public.address AS sa ON sa.id = d."startingAddress" JOIN public.address AS da ON da.id = d.destination LEFT JOIN public.product AS dp ON dp.id = d.id LEFT JOIN public.product AS p ON p.id = dp.id GROUP BY d.id, s.name, r.name, ds.name, ls.name, sa.street, da.street;';

    const result: IDatabaseReturnModel = await this.db.query(query);

    return result.rows;
  }

  async findOneDelivery(id: number): Promise<IDelivery | object> {
    const query =
      'SELECT d.id, d.name, s.name AS sender_name, r.name AS recipient_name, d.send_date, d.expected_date, ds.name AS status, ls.name AS lock_status, d.route_id, sa.street AS "startingAddress", da.street AS destination_address, array_agg(p.name) AS products FROM public.delivery AS d JOIN public.employee AS s ON s.id = d.sender JOIN public.employee AS r ON r.id = d.recipient JOIN public.delivery_status AS ds ON ds.id = d.status_id JOIN public.lock_status AS ls ON ls.id = d.lock_status JOIN public.address AS sa ON sa.id = d."startingAddress" JOIN public.address AS da ON da.id = d.destination LEFT JOIN public.product AS dp ON dp.id = d.id LEFT JOIN public.product AS p ON p.id = dp.id WHERE d.id = $1 GROUP BY d.id, s.name, r.name, ds.name, ls.name, sa.street, da.street;';
    const param = [id];
    const result: IDatabaseReturnModel = await this.db.query(query, param);

    return result.rows[0];
  }

  async updateOneDelivery(
    id: number,
    data: UpdateDeliveryDto,
  ): Promise<IReturnMessage> {
    const { setQuery, queryParams } = await mountSqlUpdateKeysAndValues(
      id,
      data,
    );
    const query = `UPDATE public.delivery SET ${setQuery} WHERE id = $1`;
    await this.db.query(query, queryParams);

    return { message: 'Delivery updated successfully' };
  }

  async deleteOneDelivery(dto: DeleteDeliveryDto): Promise<IReturnMessage> {
    const query = 'DELETE FROM public.delivery WHERE id = $1';
    const param = [dto.id]; // Extract the ID from the DTO
    await this.db.query(query, param);

    return { message: 'Delivery deleted successfully' };
  }

  async getCode(id: number): Promise<IReturnMessage | object> {
    const query = `DELETE FROM public.Delivery WHERE p.id = ($1)`;
    const param = [id];
    const result: IDatabaseReturnModel = await this.db.query(query, param);

    return result.rows[0];
  }
}
