import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@src/database/Database.service';
import {
  CreateCompanyDto,
  DeleteCompanyDto,
  UpdateCompanyDto,
} from '@src/dto/Company.dto';
import { IReturnMessage } from '@src/model/ReturnMessage.model';
import { ICompany } from '@src/model/Company.model';
import { IDatabaseReturnModel } from '@src/model/DatabaseReturn.model';
import { mountSqlUpdateKeysAndValues } from '@src/utils/MountSqlUpdateKeysAndValues.utils';

@Injectable()
export class CompanyRepository {
  constructor(private readonly db: DatabaseService) {}
  async create(data: CreateCompanyDto): Promise<IReturnMessage> {
    const query =
      'INSERT INTO public.company (name, picture, cnpj, password, area, email, address_id, type_id, status_id) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
    const values = [
      data.name.toUpperCase(),
      data.picture,
      data.cnpj,
      data.password,
      data.area,
      data.email,
      data.address_id,
      data.type_id,
      data.status_id,
    ];

    await this.db.query(query, values);

    return { message: 'Empresa criada com sucesso' };
  }

  async findAll(): Promise<ICompany[] | object[]> {
    const query =
      'SELECT c.id, c.name AS company_name, c.picture, c.cnpj, c.area, c.email, a.city, a.state, t.name AS type_account, s.name AS status_account FROM public.company AS c LEFT JOIN public.address AS a ON a.id = c.address_id LEFT JOIN public.type_account AS t ON t.id = c.type_id LEFT JOIN public.status_account AS s ON s.id = c.status_id';
    const result: IDatabaseReturnModel = await this.db.query(query);

    return result.rows;
  }

  async findOne(id: number): Promise<ICompany | object> {
    const query =
      "SELECT c.id, c.name AS company_name, c.picture AS company_picture, c.cnpj, c.area, c.email, a.street, a.complement, a.number, a.city, a.state, t.name AS type_account, s.name AS status_account, array_agg(json_build_object('employee_id', e.id,'employee_name', e.name, 'employee_picture', e.picture)) AS employees FROM public.company AS c LEFT JOIN public.address AS a ON a.id = c.address_id LEFT JOIN public.type_account AS t ON t.id = c.type_id LEFT JOIN public.status_account AS s ON s.id = c.status_id LEFT JOIN public.employee AS e ON c.id = e.company_id WHERE c.id = ($1) GROUP BY c.id, c.name, c.picture, c.cnpj, c.area, c.email, a.street, a.complement, a.number, a.city, a.state, t.name, s.name;";
    const param = [id];
    const result: IDatabaseReturnModel = await this.db.query(query, param);

    return result.rows[0];
  }

  async updateOne(id: number, data: UpdateCompanyDto): Promise<IReturnMessage> {
    const { setQuery, queryParams } = await mountSqlUpdateKeysAndValues(
      id,
      data,
    );
    const query = `UPDATE public.company SET ${setQuery} WHERE id = ($1)`;
    await this.db.query(query, queryParams);

    return { message: 'Empresa atualizada com sucesso' };
  }

  async deleteOne(id: DeleteCompanyDto): Promise<IReturnMessage> {
    const query = 'UPDATE public.company SET status_id = 4 WHERE id = ($1)';
    const param = [id];
    await this.db.query(query, param);

    return { message: 'Empresa excluida com sucesso' };
  }

  async getCode(id: number): Promise<IReturnMessage | object> {
    const query = `SELECT password FROM public.company WHERE id = ($1)`;
    const param = [id];
    const result: IDatabaseReturnModel = await this.db.query(query, param);

    return result.rows[0];
  }

  async validateUser(email: string): Promise<object> {
    const query = `SELECT email, password, type_id, status_id FROM public.company WHERE email = ($1)`;
    const param = [email];
    const result: IDatabaseReturnModel = await this.db.query(query, param);

    return result.rows[0];
  }
}
