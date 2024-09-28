export interface ILogin {
  id?: number;
  email?: string;
  password?: string;
  type?: boolean;
  status_id?: number;
  type_id?: number;
  updated_at?: Date;
}

export interface ILoginPayload {
  email: string;
  role: boolean;
  type: number;
}
