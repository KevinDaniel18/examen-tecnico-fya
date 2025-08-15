import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CreditModule } from './credit/credit.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, CreditModule, AuthModule],
})
export class AppModule {}
