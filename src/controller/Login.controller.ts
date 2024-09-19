import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@src/middleware/Auth.service';
import { ValidateLoginDto } from '@src/dto/Login.dto';

@Controller(`v1/login`)
export class LoginController {
  constructor(private readonly loginService: AuthService) {}

  @Post()
  async validateLogin(@Body() body: ValidateLoginDto) {
    return await this.loginService.validateUser(body);
  }
}
