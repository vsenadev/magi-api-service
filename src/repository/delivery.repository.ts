import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { IReturnMessage } from '../model/returnMessage.model';
import { IDatabaseReturnModel } from '../model/databaseReturn.model';
import { mountSqlUpdateKeysAndValues } from '../utils/mountSqlUpdateKeysAndValues.utils';
import { CreateDeliveryDto, DeleteDeliveryDto, UpdateDeliveryDto } from 'src/dto/Delivery.dto';
import { IDelivery } from 'src/model/Delivery.model';

@Injectable()
export class DeliveryRepository {
    constructor(private readonly db: DatabaseService) { }
    async create(data: CreateDeliveryDto): Promise<IReturnMessage> {
        const query =
            'INSERT INTO public.Delivery (name, sender, recipient, send_date, expected_date, status_id, lock_status, route_id, startingAddress, destination, products) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';
        const values = [
            data.name.toUpperCase(),
            data.sender,
            data.recipient,
            data.send_date,
            data.expected_date,
            data.status_id,
            data.lock_status,
            data.route_id,
            data.starting_adress,
            data.destination,
            data.products
        ];

        await this.db.query(query, values);

        return { message: 'Entrega criada com sucesso' };
    }

    async findAllDeliverys(): Promise<IDelivery[] | object[]> {
        const query =
            'SELECT d.id, d.name, s.name AS sender_name, r.name AS recipient_name, d.send_date, d.expected_date, ds.status_name AS status, ls.lock_status_name AS lock_status, d.route_id, sa.adress AS starting_adress, da.adress AS destination_adress, array_agg(p.name) AS products FROM public.Delivery AS d JOIN public.Employee AS s ON s.id = d.sender JOIN public.Employee AS r ON r.id = d.recipient JOIN public.Delivery_Status AS ds ON ds.id = d.status_id JOIN public.Lock_Status AS ls ON ls.id = d.lock_status JOIN public.Adress AS sa ON sa.id = d.starting_adress JOIN public.Adress AS da ON da.id = d.destination LEFT JOIN public.Delivery_Products AS dp ON dp.delivery_id = d.id LEFT JOIN public.Product AS p ON p.id = dp.product_id GROUP BY d.id, s.name, r.name, ds.status_name, ls.lock_status_name, sa.adress, da.adress; ';    
        const result: IDatabaseReturnModel = await this.db.query(query);

        return result.rows;
    }

    async findOneDelivery(id: number): Promise<IDelivery | object> {
        const query = "SELECT d.id, d.name, s.name AS sender_name, r.name AS recipient_name, d.send_date, d.expected_date, ds.status_name AS status, ls.lock_status_name AS lock_status, d.route_id, sa.adress AS starting_adress, da.adress AS destination_adress, array_agg(p.name) AS products FROM public.Delivery AS d JOIN public.Employee AS s ON s.id = d.sender JOIN public.Employee AS r ON r.id = d.recipient JOIN public.Delivery_Status AS ds ON ds.id = d.status_id JOIN public.Lock_Status AS ls ON ls.id = d.lock_status JOIN public.Adress AS sa ON sa.id = d.starting_adress JOIN public.Adress AS da ON da.id = d.destination LEFT JOIN public.Delivery_Products AS dp ON dp.delivery_id = d.id LEFT JOIN public.Product AS p ON p.id = dp.product_id WHERE d.id = $1 GROUP BY d.id, s.name, r.name, ds.status_name, ls.lock_status_name, sa.adress, da.adress;";
        const param = [id];
        const result: IDatabaseReturnModel = await this.db.query(query, param);
    
        return result.rows[0];
    }
    

    async updateOneDelivery(id: number, data: UpdateDeliveryDto): Promise<IReturnMessage> {
        const { setQuery, queryParams } = await mountSqlUpdateKeysAndValues(id, data);
        const query = `UPDATE public.Delivery SET ${setQuery} WHERE id = ($1)`;
        await this.db.query(query, queryParams);
    
        return { message: 'Delivery updated successfully' };
    }
    

    async deleteOneDelivery(dto: DeleteDeliveryDto): Promise<IReturnMessage> {
        const query = 'DELETE FROM public.Delivery WHERE id = ($1)';
        const param = [dto.id];  // Extract the ID from the DTO
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
