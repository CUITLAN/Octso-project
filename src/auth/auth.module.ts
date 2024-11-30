import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeORMError } from 'typeorm';
import { Auth } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JWT_KEY, EXPIRES_IN } from './constants/jwt.contants';
import { Empleoye } from 'src/empleoyes/entities/empleoye.entity';
import { Manager } from 'src/manager/entities/manager.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Auth, Empleoye, Manager]),
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
