import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { IReturnMessage } from '../model/returnMessage.model';
import { IDatabaseReturnModel } from '../model/databaseReturn.model';
import { mountSqlUpdateKeysAndValues } from '../utils/mountSqlUpdateKeysAndValues.utils';
import { CreateEmployeeDto } from 'src/dto/employee.dto';
import { IEmployee } from 'src/model/employee.model';

@Injectable()
export class EmployeeRepository {
  constructor(private readonly db: DatabaseService) {}
  async create(data: CreateEmployeeDto): Promise<IReturnMessage> {
    const query =
      'INSERT INTO public.employee (name, company_id, cpf, password, email, phone_number) values ($1, $2, $3, $4, $5, $6)';
    const values = [
      data.name.toUpperCase(),
      data.company_id,
      data.cpf,
      data.password, 
      data.email,
      data.phoneNumber,
    ];

    await this.db.query(query, values);

    return { message: 'Funcionário criado com sucesso' };
  }

  async findAll(): Promise<IEmployee[] | object[]> {
    const query =
      'SELECT c.id, c.name AS company_name, c.picture, c.cnpj, c.area, c.email, a.city, a.state, t.name AS type_account, s.name AS status_account FROM public.company AS c LEFT JOIN public.address AS a ON a.id = c.address_id LEFT JOIN public.type_account AS t ON t.id = c.type_id LEFT JOIN public.status_account AS s ON s.id = c.status_id';
    const result: IDatabaseReturnModel = await this.db.query(query);

    return result.rows;
  }

  async findOne(id: number): Promise<IEmployee | object> {
    const query =
      "SELECT c.id, c.name AS company_name, c.picture AS company_picture, c.cnpj, c.area, c.email, a.street, a.complement, a.number, a.city, a.state, t.name AS type_account, s.name AS status_account, array_agg(json_build_object('employee_id', e.id,'employee_name', e.name, 'employee_picture', e.picture)) AS employees FROM public.company AS c LEFT JOIN public.address AS a ON a.id = c.address_id LEFT JOIN public.type_account AS t ON t.id = c.type_id LEFT JOIN public.status_account AS s ON s.id = c.status_id LEFT JOIN public.employee AS e ON c.id = e.company_id WHERE c.id = ($1) GROUP BY c.id, c.name, c.picture, c.cnpj, c.area, c.email, a.street, a.complement, a.number, a.city, a.state, t.name, s.name;";
    const param = [id];
    const result: IDatabaseReturnModel = await this.db.query(query, param);

    return result.rows[0];
  }

  async updateOne(id: number, data: UpdateEmployeeDto): Promise<IReturnMessage> {
    const { setQuery, queryParams } = await mountSqlUpdateKeysAndValues(
      id,
      data,
    );
    const query = `UPDATE public.company SET ${setQuery} WHERE id = ($1)`;
    await this.db.query(query, queryParams);

    return { message: 'Funcionário atualizado com sucesso' };
  }

  async deleteOne(id: DeleteEmployeeDto): Promise<IReturnMessage> {
    const query = 'UPDATE public.company SET status_id = 4 WHERE id = ($1)';
    const param = [id];
    await this.db.query(query, param);

    return { message: 'Funcionário excluído com sucesso' };
  }

  async getCode(id: number): Promise<IReturnMessage | object> {
    const query = `SELECT password FROM public.company WHERE id = ($1)`;
    const param = [id];
    const result: IDatabaseReturnModel = await this.db.query(query, param);

    return result.rows[0];
  }
}
