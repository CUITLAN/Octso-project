// src/managers/managers.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from './entities/manager.entity';
import { User } from 'src/auth/entities/user.entity'; // <-- Importar User
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'; // <-- Importar bcrypt

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>,
    @InjectRepository(User)
    private userRepository: Repository<User> // <-- Inyectar repositorio de User
  ){}

  async create(createManagerDto: CreateManagerDto) {
    // 1. Separar la contraseña del resto de los datos del mánager
    const { managerPassword, ...managerData } = createManagerDto;

    // 2. Crear automáticamente la cuenta de acceso del gerente
    const newUser = this.userRepository.create({
      userEmail: managerData.managerEmail,
      userPassword: bcrypt.hashSync(managerPassword, 5), // Encriptar la contraseña recibida
      userRoles: ["Manager"]
    });
    
    const savedUser = await this.userRepository.save(newUser);

    // 3. Crear el perfil del mánager y vincularle la cuenta
    const newManager = this.managerRepository.create({
      ...managerData,
      user: savedUser 
    });

    return this.managerRepository.save(newManager);
  }

  findAll() {
    return this.managerRepository.find({
      relations: {
        location: true,
      }
    })
  }

  findOne(id: string) {
    const manager = this.managerRepository.findOne({
      where: {managerId: id},
      relations: {
        location: true,
        user: true,
      }
    })
    if (!manager) throw new NotFoundException("No manager found")
    return manager;
  }

  async update(id: string, updateManagerDto: UpdateManagerDto) {
    const managerToUpdate = await this.managerRepository.preload({
      managerId: id,
        ...updateManagerDto
    })
    return this.managerRepository.save(managerToUpdate)
  }

  remove(id: string) {
    return this.managerRepository.delete({
      managerId: id
    })
  }
}