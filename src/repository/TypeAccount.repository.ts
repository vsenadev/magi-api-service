import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@src/database/Database.service';
import { IReturnMessage } from '@src/model/ReturnMessage.model';
import { IDatabaseReturnModel } from '@src/model/DatabaseReturn.model';
import { mountSqlUpdateKeysAndValues } from '@src/utils/MountSqlUpdateKeysAndValues.utils';
import {
  CreateTypeAccountDto,
  DeleteTypeAccountDto,
  UpdateTypeAccountDto,
} from '@src/dto/TypeAccount.dto';
import { ITypeAccount } from '@src/model/TypeAccount.model';

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

  async findOneByName(name: string): Promise<ITypeAccount> {
    const query = `SELECT id FROM public.type_account WHERE name = ($1)`;
    const param = [name];
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
