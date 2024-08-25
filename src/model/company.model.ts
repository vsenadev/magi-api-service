export interface ICompany {
  id?: number;
  name?: string;
  picture?: string;
  cnpj?: string;
  password?: string;
  area?: string;
  email?: string;
  address_id?: number;
  type_id?: number;
  status_id?: number;
}

export interface ICompanyCode {
  code: number;
}
