export interface IAddress {
  id?: number;
  cep: string;
  street: string;
  complement?: string;
  city: string;
  state: string;
  number: string;
}
