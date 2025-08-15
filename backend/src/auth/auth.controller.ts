import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/auth.dto';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly jwt: JwtService,
  ) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    try {
      return await this.auth.login(loginDto);
    } catch (error) {
      console.error(error);
    }
  }
}
