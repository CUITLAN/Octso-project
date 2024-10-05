import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { ApiAuth } from 'src/auth/decorators/api.decorator';
import { ApiTags } from '@nestjs/swagger';
@ApiAuth()
@ApiTags('Auth')
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
  @Patch("/:email")
  updateUser(@Param('email') userEmail:string, @Body() updateuseDto : UpdateAuthDto){
    return this.authService.updateUser(userEmail,updateuseDto)
  }
}
