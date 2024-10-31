export interface IProduct {
  id?: number;
  name?: string;
  type?: string;
  value?: number;
  length?: number;
  width?: number;
  height?: number;
  company_id?: number;
  quantity?: number;
}

export interface IProductCode {
  code: number;
}
