import { ILogin } from '@src/model/Login.model';
import { ValidateLoginSchema } from '@src/schema/Login.schema';

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
