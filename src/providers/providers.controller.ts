import { Controller,UseGuards, Get, Post, Body, Patch, Param, Delete, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserData } from 'src/auth/decorators/user.decorator';
import { Auth } from 'src/auth/entities/user.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthUser } from 'src/auth/decorators/auth.decorator';
import {ROLES} from "src/auth/constants/roles.constats"
import { ApiAuth } from 'src/auth/decorators/api.decorator';
import { ApiTags } from '@nestjs/swagger';
@ApiAuth()
@ApiTags('Providers')
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}
  @AuthUser( ROLES.MANAGER)
  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }
  @AuthUser(ROLES.EMPLEOYEE, ROLES.MANAGER)
  @Get('/name/:name')
  findbyName(@Param('name') name: string){
    const provider = this.providersService.findbyName(name);
    if(!provider) throw new NotFoundException()
    return provider;

  }
  @AuthUser(ROLES.EMPLEOYEE, ROLES.MANAGER)
  @Get()
  findAll(@UserData() user: Auth) {
    if (user.userRoles.includes("Empleoyee")) throw new UnauthorizedException("No estas autorizado")
    return this.providersService.findAll();
  }
  
  @AuthUser(ROLES.EMPLEOYEE, ROLES.MANAGER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    const provider = this.providersService.findOne(id);
    if (!provider) throw new NotFoundException()
    return provider;
  }
  @AuthUser(ROLES.MANAGER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProviderDto: UpdateProviderDto) {
    return this.providersService.update(id, updateProviderDto);
  }
  @AuthUser(ROLES.MANAGER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.providersService.remove(id);
  }
}
