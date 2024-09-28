import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '@src/middleware/Auth.service';
import { ValidateLoginDto } from '@src/dto/Login.dto';
import { IReturnMessage } from '@src/model/ReturnMessage.model';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ILoginPayload } from '@src/model/Login.model';

@Controller(`v1/login`)
export class LoginController {
  constructor(private readonly loginService: AuthService) {}

  @Post()
  async validateLogin(@Body() body: ValidateLoginDto): Promise<IReturnMessage> {
    return await this.loginService.validateUser(body);
  }

  @Get('')
  @UseGuards(AuthGuard('jwt'))
  async getLoginInformation(@Req() req: Request) {
    const payload: ILoginPayload | any = req.user;
    return {
      role: payload.role,
      type: payload.type,
    };
  }
}
