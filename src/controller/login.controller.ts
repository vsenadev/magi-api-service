import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../middleware/auth.service';
import { ValidateLoginDto } from '../dto/login.dto';

@Controller(`api/v1/login`)
export class LoginController {
  constructor(private readonly loginService: AuthService) {}

  @Post()
  async validateLogin(@Body() body: ValidateLoginDto) {
    return await this.loginService.validateUser(body);
  }
}
