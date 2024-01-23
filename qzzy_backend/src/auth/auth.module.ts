import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt/dist';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import {ConfigModule} from '@nestjs/config';

@Module({
  imports: [UsersModule, PassportModule, ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' }
  })],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports:[AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
