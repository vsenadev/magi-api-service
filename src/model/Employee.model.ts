export interface IEmployee {
  id?: number;
  name?: string;
  company_id?: number;
  cpf?: string;
  password?: string;
  phoneNumber?: string;
  email?: string;
  status_id?: number;
  type_id?: number;
  type_account?: string;
}

export interface IEmployeeCode {
  code: number;
}
