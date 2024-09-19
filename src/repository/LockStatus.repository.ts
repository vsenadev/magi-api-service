import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@src/database/Database.service';
import { IReturnMessage } from '@src/model/ReturnMessage.model';
import { IDatabaseReturnModel } from '@src/model/DatabaseReturn.model';
import { mountSqlUpdateKeysAndValues } from '@src/utils/MountSqlUpdateKeysAndValues.utils';
import {
  CreateLockStatusDto,
  DeleteLockStatusDto,
  UpdateLockStatusDto,
} from '@src/dto/LockStatus.dto';
import { ILockStatus } from '@src/model/LockStatus.model';

@Injectable()
export class LockStatusRepository {
  constructor(private readonly db: DatabaseService) {}
  async create(data: CreateLockStatusDto): Promise<IReturnMessage> {
    const query =
      'INSERT INTO public.lock_status (name, description) VALUES ($1, $2)';
    const values = [data.name.toUpperCase(), data.description];

    await this.db.query(query, values);

    return { message: 'Status da tranca criado com sucesso' };
  }

  async findAll(): Promise<ILockStatus[]> {
    const query = 'SELECT * FROM public.lock_status';
    const result: IDatabaseReturnModel = await this.db.query(query);
    return result.rows;
  }

  async findOne(id: number): Promise<ILockStatus> {
    const query = `SELECT * FROM public.lock_status WHERE id = ($1)`;
    const param = [id];
    const result: IDatabaseReturnModel = await this.db.query(query, param);

    return result.rows[0];
  }

  async updateOne(
    id: number,
    data: UpdateLockStatusDto,
  ): Promise<IReturnMessage> {
    const { setQuery, queryParams } = await mountSqlUpdateKeysAndValues(
      id,
      data,
    );
    const query = `UPDATE public.lock_status SET ${setQuery} WHERE id = ($1)`;
    await this.db.query(query, queryParams);

    return { message: 'Status da tranca atualizado com sucesso' };
  }

  async deleteOne(id: DeleteLockStatusDto): Promise<IReturnMessage> {
    const query = 'DELETE FROM public.lock_status WHERE id = ($1)';
    const param = [id.id];
    await this.db.query(query, param);

    return { message: 'Status da tranca excluído com sucesso' };
  }
}
