import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@src/database/Database.service';
import { IReturnMessage } from '@src/model/ReturnMessage.model';
import { IDatabaseReturnModel } from '@src/model/DatabaseReturn.model';
import { mountSqlUpdateKeysAndValues } from '@src/utils/MountSqlUpdateKeysAndValues.utils';
import {
  CreateStatusAccountDto,
  DeleteStatusAccountDto,
  UpdateStatusAccountDto,
} from '@src/dto/StatusAccount.dto';
import { IStatusAccount } from '@src/model/StatusAccount.model';

@Injectable()
export class StatusAccountRepository {
  constructor(private readonly db: DatabaseService) {}
  async create(data: CreateStatusAccountDto): Promise<IReturnMessage> {
    const query =
      'INSERT INTO public.status_account (name, description) VALUES ($1, $2)';
    const values = [data.name.toUpperCase(), data.description];

    await this.db.query(query, values);

    return { message: 'Status da conta criado com sucesso' };
  }

  async findAll(): Promise<IStatusAccount[]> {
    const query = 'SELECT * FROM public.status_account';
    const result: IDatabaseReturnModel = await this.db.query(query);
    return result.rows;
  }

  async findOne(id: number): Promise<IStatusAccount> {
    const query = `SELECT * FROM public.status_account WHERE id = ($1)`;
    const param = [id];
    const result: IDatabaseReturnModel = await this.db.query(query, param);

    return result.rows[0];
  }

  async updateOne(
    id: number,
    data: UpdateStatusAccountDto,
  ): Promise<IReturnMessage> {
    const { setQuery, queryParams } = await mountSqlUpdateKeysAndValues(
      id,
      data,
    );
    const query = `UPDATE public.status_account SET ${setQuery} WHERE id = ($1)`;
    await this.db.query(query, queryParams);

    return { message: 'Status da conta atualizado com sucesso' };
  }

  async deleteOne(id: DeleteStatusAccountDto): Promise<IReturnMessage> {
    const query = 'DELETE FROM public.status_account WHERE id = ($1)';
    const param = [id.id];
    await this.db.query(query, param);

    return { message: 'Status da conta excluído com sucesso' };
  }
}
