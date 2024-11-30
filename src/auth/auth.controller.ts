import { Controller, Get, Post, Body, Patch, Param, Delete, Put,Query, Res, BadRequestException } from '@nestjs/common';
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

  @Post("register/:id")
  registerManager(
    @Query("role") role: string,
    @Body() createUserDto: CreateAuthDto,
    @Param("id") id: string,
  ) {
    if (role === "manager") {
      return this.authService.registerManager(id, createUserDto)
    } else if ( role === "employee" ) {
      return this.authService.registerEmployee(id, createUserDto)
    }
    throw new BadRequestException("Rol inválido");
  }

  @Post("login")
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
    @Cookies() cookies: any,
  ) {
    const token = await this.authService.loginUser(loginUserDto);
    let expireDate = new Date();
    expireDate.setDate(expireDate.getDay() + 7);
    response.cookie(TOKEN_NAME, token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      domain: process.env.cookiesDomain,
      expires: expireDate,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return;
  }
  @Patch("/:id")
  updateUser(
    @Param("id") userEmail: string,
    @Body() updateUserDto: UpdateAuthDto,
  ) {
    return this.authService.updateUser(userEmail, updateUserDto);
  }
}