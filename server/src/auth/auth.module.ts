import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/module/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [forwardRef(() => UserModule),JwtModule.register({})],
  exports: [AuthService]
})
export class AuthModule {}
