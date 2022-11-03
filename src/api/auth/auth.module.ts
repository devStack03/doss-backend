import { Module, Global } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
// import { UserSchema, User } from './../users/users.schema';
import UserSchema from '../users/model/user.schema';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { JwtRefreshTokenStrategy } from './jwt-refresh-token.strategy';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    UsersModule,
    PassportModule,
    JwtModule.register({}),

  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }
