import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { IReturnMessage } from '../model/returnMessage.model';
import { IDatabaseReturnModel } from '../model/databaseReturn.model';
import { mountSqlUpdateKeysAndValues } from '../utils/mountSqlUpdateKeysAndValues.utils';
import { CreateEmployeeDto, DeleteEmployeeDto, UpdateEmployeeDto } from 'src/dto/employee.dto';
import { IEmployee } from 'src/model/employee.model';

@Injectable()
export class EmployeeRepository {
  constructor(private readonly db: DatabaseService) {}
  async create(data: CreateEmployeeDto): Promise<IReturnMessage> {
    const query =
      'INSERT INTO public.employee (name, company_id, picture, cpf, password, email, telephone, status_id, type_id) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
    const values = [
      data.name.toUpperCase(),
      data.company_id,
      data.picture,
      data.cpf,
      data.password, 
      data.email,
      data.telephone,
      data.status_id,
      data.type_id
    ];

    await this.db.query(query, values);

    return { message: 'Funcionário criado com sucesso' };
  }

  async findAllEmployees(): Promise<IEmployee[] | object[]> {
    const query =
      'SELECT e.id, e.name AS employee_name, e.picture, c.name AS company_name, e.cpf, e.email, t.name AS type_account, s.name AS status_account FROM public.employee AS e JOIN public.company AS c ON c.id = e.company_id LEFT JOIN public.type_account AS t ON t.id = e.type_id LEFT JOIN public.status_account AS s ON s.id = e.status_id WHERE c.id = e.company_id;';
    const result: IDatabaseReturnModel = await this.db.query(query);

    return result.rows;
  }

  async findOneEmployee(id: number): Promise<IEmployee | object> {
    const query =
      "SELECT e.id, e.name AS employee_name, e.picture, c.name AS company_name, e.cpf, e.email, t.name AS type_account, s.name AS status_account FROM public.employee AS e JOIN public.company AS c ON c.id = e.company_id LEFT JOIN public.type_account AS t ON t.id = e.type_id LEFT JOIN public.status_account AS s ON s.id = e.status_id WHERE c.id = ($1);"
    const param = [id];
    const result: IDatabaseReturnModel = await this.db.query(query, param);

    return result.rows[0];
  }

  async updateOneEmployee(id: number, data: UpdateEmployeeDto): Promise<IReturnMessage> {
    const { setQuery, queryParams } = await mountSqlUpdateKeysAndValues(
      id,
      data,
    );
    const query = `UPDATE public.company SET ${setQuery} WHERE id = ($1)`;
    await this.db.query(query, queryParams);

    return { message: 'Funcionário atualizado com sucesso' };
  }

  async deleteOneEmployee(dto: DeleteEmployeeDto): Promise<IReturnMessage> {
    const query = 'DELETE FROM public.employee AS e WHERE e.id = ($1)';
    const param = [dto.id];  // Extract the ID from the DTO
    await this.db.query(query, param);

    return { message: 'Funcionário excluído com sucesso' };
}


  async getCode(id: number): Promise<IReturnMessage | object> {
    const query = `DELETE FROM public.employee WHERE e.id = ($1)`;
    const param = [id];
    const result: IDatabaseReturnModel = await this.db.query(query, param);

    return result.rows[0];
  }
}
