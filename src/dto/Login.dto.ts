import { ILogin } from '@src/model/Login.model';
import { ValidateLoginSchema } from '@src/schema/Login.schema';
import { ApiProperty } from '@nestjs/swagger';

export class ValidateLoginDto {
  @ApiProperty({
    description: 'Email of the user',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'yourSecurePassword',
  })
  password: string;

  @ApiProperty({
    description: 'Indicates if the user is an administrator or regular user',
    example: true,
  })
  type: boolean;

  constructor(props: ILogin) {
    const parsed = ValidateLoginSchema.parse(props);
    this.email = parsed.email;
    this.password = parsed.password;
    this.type = parsed.type;
  }
}
