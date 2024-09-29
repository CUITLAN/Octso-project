import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './entities/user.entity';
import * as bcrypt from "bcrypt"
import  * as jwt  from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    private JwtService: JwtService,
  ){}
  registerUser(createAuthDto: CreateAuthDto){
    createAuthDto.userPassword = bcrypt.hashSync(createAuthDto.userPassword,5)
    return this.authRepository.save(createAuthDto);

  }
  async loginUser(loginUserDto: LoginUserDto){
    const user = await this.authRepository.findOne({
      where:{
        userEmail: loginUserDto.userEmail
      },
    })
    const match = await bcrypt.compare(loginUserDto.userPassword, user.userPassword)
    if (!match) return new UnauthorizedException("NO estas autorizado");
    const payload = {
      userEmail: user.userEmail,
      userPassword: user.userPassword,
      userRoles: user.userRoles
    };
    const token = this.JwtService.sign(payload);
    return token;

  }
}
