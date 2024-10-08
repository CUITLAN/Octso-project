import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeORMError } from 'typeorm';
import { Auth } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JWT_KEY, EXPIRES_IN } from './constants/jwt.contants';
@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
  JwtModule.register({
    secret: JWT_KEY,
    signOptions:{
      expiresIn: EXPIRES_IN,
    },
    global:true,
  })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
