import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Res } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { ApiAuth } from 'src/auth/decorators/api.decorator';
import { ApiTags } from '@nestjs/swagger';
import { Response, response } from 'express';
import { TOKEN_NAME } from './constants/jwt.contants';
import { Cookies } from './decorators/cookies.decorator';
@ApiAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("signup")
  signup(@Body()CreateAuthDto: CreateAuthDto){
    this.authService.registerUser(CreateAuthDto)
  } 

  @Post("login")
  async login(@Body() loginUserdto: LoginUserDto, @Res({passthrough: true}) response: Response, @Cookies() cookies: any){
    const token = await this.authService.loginUser(loginUserdto)
    console.log(token);
    response.cookie(TOKEN_NAME, token,{
      httpOnly: false,
      secure: true,
      sameSite: 'none',
      maxAge:  1000 * 60 * 60 * 24 * 7
    })
    return token;

  }
  @Patch("/:email")
  updateUser(@Param('email') userEmail:string, @Body() updateuseDto : UpdateAuthDto){
    return this.authService.updateUser(userEmail,updateuseDto)
  }
}
