import { ILogin } from '../model/login.model';
import { ValidateLoginSchema } from '../schema/login.schema';

export class ValidateLoginDto {
  email: string;
  password: string;
  type: boolean;

  constructor(props: ILogin) {
    const parsed = ValidateLoginSchema.parse(props);
    this.email = parsed.email;
    this.password = parsed.password;
    this.type = parsed.type;
  }
}
