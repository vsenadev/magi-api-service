import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@src/database/Database.service';
import { mountSqlUpdateKeysAndValues } from '@src/utils/MountSqlUpdateKeysAndValues.utils';
import {
  CreateAddressDto,
  UpdateAddressDto,
  DeleteAddressDto,
} from '@src/dto/Address.dto';
import { IReturnMessage } from '@src/model/ReturnMessage.model';

@Injectable()
export class AddressRepository {
  constructor(private readonly db: DatabaseService) {}
  async create(data: CreateAddressDto): Promise<number> {
    const query =
      'INSERT INTO public.address (cep, street, complement, city, state, number) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id';
    const values = [
      data.cep,
      data.street,
      data.complement,
      data.city,
      data.state,
      data.number,
    ];

    const addressId = await this.db.query(query, values);

    return addressId.rows[0].id;
  }

  async updateOne(id: number, data: UpdateAddressDto): Promise<IReturnMessage> {
    const { setQuery, queryParams } = await mountSqlUpdateKeysAndValues(
      id,
      data,
    );
    const query = `UPDATE public.address SET ${setQuery} WHERE id = ($1)`;
    await this.db.query(query, queryParams);

    return { message: 'Endereço atualizado com sucesso' };
  }

  async deleteOne(id: DeleteAddressDto): Promise<IReturnMessage> {
    const query = `DELETE FROM public.address WHERE id = ($1)`;
    const param = [id];
    await this.db.query(query, param);

    return { message: 'Endereço excluido com sucesso' };
  }
}
