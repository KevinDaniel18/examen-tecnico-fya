import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { LoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}
  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;

    const users = await this.prisma.user.findUnique({
      where: { email },
    });
    console.log(users);

    if (!users) {
      console.log('email not found');
      throw new NotFoundException('email not found');
    }
    const validatePassword = await bcrypt.compare(password, users.password);
    console.log(validatePassword);
    if (!validatePassword) {
      console.log('invalid password');

      throw new UnauthorizedException('invalid password');
    }

    const token = this.jwt.sign({
      sub: users.id,
      email: users.email,
      name: users.name,
    });

    return {
      token,
      userId: users.id,
      name: users.name,
    };
  }
}
