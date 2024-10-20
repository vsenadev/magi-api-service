export interface ICompany {
  id?: number;
  name?: string;
  picture?: string;
  cep?: string;
  cnpj?: string;
  password?: string;
  area?: string;
  email?: string;
  address_id?: number;
  type_id?: number;
  status_id?: number;
  city?: string;
  number?: string;
  state?: string;
  street?: string;
  type_account?: string;
}

export interface ICompanyCode {
  code: number;
}
