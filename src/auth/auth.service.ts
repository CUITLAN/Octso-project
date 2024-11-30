import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './entities/user.entity';
import * as bcrypt from "bcrypt"
import  * as jwt  from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { Empleoye } from 'src/empleoyes/entities/empleoye.entity';
import { Manager } from 'src/manager/entities/manager.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
    @InjectRepository(Empleoye) private EmpleoyeRepository: Repository<Empleoye>,
    @InjectRepository(Manager) private ManagerRepository: Repository<Manager>,

    private JwtService: JwtService,
  ){}
  async registerEmployee(id: string, createUserDto: CreateAuthDto) {
    const roles = createUserDto.userRoles
    if (roles.includes("Admin") || roles.includes("Manager")) {
      throw new BadRequestException("Invalid")
    }
    createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5);
    const user = await this.authRepository.save(createUserDto);
    const employee = await this.EmpleoyeRepository.preload({
      employeeId: id,
    })
    employee.user = user;
    return this.EmpleoyeRepository.save(employee)
  }

  async registerManager(id: string, createUserDto: CreateAuthDto) {
    const roles = createUserDto.userRoles
    if (roles.includes("Admin") || roles.includes("Employee")) {
      throw new BadRequestException("Invalid")
    }
    createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5);
    const user = await this.authRepository.save(createUserDto);
    const manager = await this.ManagerRepository.preload({
      managerId: id,
    })
    manager.user = user;
    return this.ManagerRepository.save(manager)
  }



  async loginUser(loginUserDto: LoginUserDto){
    const user = await this.authRepository.findOne({
      where:{
        userEmail: loginUserDto.userEmail
      },
    })
    if(!user) throw new UnauthorizedException("No estas autorizadosss")
    const match = await bcrypt.compare(loginUserDto.userPassword, user.userPassword)
    if (!match) return new UnauthorizedException("No estas autorizado");
    const payload = {
      userEmail: user.userEmail,
      userPassword: user.userPassword,
      userRoles: user.userRoles
    };
    const token = this.JwtService.sign(payload);
    console.log(token)
    return token;

  }
  async updateUser(userEmail: string,UpdateAuthDto: UpdateAuthDto){
    const newUserData = await this.authRepository.preload({
    userEmail,
    ...UpdateAuthDto
    })
    this.authRepository.save(newUserData)
    return newUserData;
  }
}
