import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  signup(@Body()CreateAuthDto: CreateAuthDto){
    this.authService.registerUser(CreateAuthDto)
  } 

  @Post("login")
  login(@Body() loginUserdto: LoginUserDto){
    return this.authService.loginUser(loginUserdto)

  }

}
