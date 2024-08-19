import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { IReturnMessage } from '../model/returnMessage.model';
import { IDatabaseReturnModel } from '../model/databaseReturn.model';
import { mountSqlUpdateKeysAndValues } from '../utils/mountSqlUpdateKeysAndValues.utils';
import {
  CreateTypeAccountDto,
  DeleteTypeAccountDto,
  UpdateTypeAccountDto,
} from '../dto/typeAccount.dto';
import { ITypeAccount } from '../model/typeAccount.model';

@Injectable()
export class TypeAccountRepository {
  constructor(private readonly db: DatabaseService) {}
  async create(data: CreateTypeAccountDto): Promise<IReturnMessage> {
    const query =
      'INSERT INTO public.type_account (name, description) VALUES ($1, $2)';
    const values = [data.name.toUpperCase(), data.description];

    await this.db.query(query, values);

    return { message: 'Tipo da conta criado com sucesso' };
  }

  async findAll(): Promise<ITypeAccount[]> {
    const query = 'SELECT * FROM public.type_account';
    const result: IDatabaseReturnModel = await this.db.query(query);
    return result.rows;
  }

  async findOne(id: number): Promise<ITypeAccount> {
    const query = `SELECT * FROM public.type_account WHERE id = ($1)`;
    const param = [id];
    const result: IDatabaseReturnModel = await this.db.query(query, param);

    return result.rows[0];
  }

  async updateOne(
    id: number,
    data: UpdateTypeAccountDto,
  ): Promise<IReturnMessage> {
    const { setQuery, queryParams } = await mountSqlUpdateKeysAndValues(
      id,
      data,
    );
    const query = `UPDATE public.type_account SET ${setQuery} WHERE id = ($1)`;
    await this.db.query(query, queryParams);

    return { message: 'Tipo da conta atualizado com sucesso' };
  }

  async deleteOne(id: DeleteTypeAccountDto): Promise<IReturnMessage> {
    const query = 'DELETE FROM public.type_account WHERE id = ($1)';
    const param = [id.id];
    await this.db.query(query, param);

    return { message: 'Tipo da conta excluído com sucesso' };
  }
}
