import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmpleoyeDto } from './dto/create-empleoye.dto';
import { UpdateEmpleoyeDto } from './dto/update-empleoye.dto';
import {v4 as uuid} from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Empleoye } from './entities/empleoye.entity';
import { Repository } from 'typeorm';


@Injectable()
export class EmpleoyesService {
  constructor(
    @InjectRepository(Empleoye)
    private empleoyeRepository: Repository<Empleoye>
  ){}
  async create(createEmpleoyeDto: CreateEmpleoyeDto) {
    const employe = await this.empleoyeRepository.save(createEmpleoyeDto)
    return employe;
  }

  findAll() {
    return this.empleoyeRepository.find({
      relations:{
        location: true
      }
    })
  }

  async findByLocation(id: number){
    const empleoyeLid = await this.empleoyeRepository.findBy({
      location:{
        locationId: id
      }
    })
    return empleoyeLid;
  }
  findOne(id: string) {
   const empleoye = this.empleoyeRepository.findOne({
    where:{
      employeeId: id
    },
    relations:{
      location: true,
    }
   })
   return empleoye
  }

  async update(id: string, updateEmpleoyeDto: UpdateEmpleoyeDto) {
    const employeToUpdate= await this.empleoyeRepository.preload({
      employeeId: id,
      ...updateEmpleoyeDto
    })
    this.empleoyeRepository.save(employeToUpdate)
    return employeToUpdate;
  }

  remove(id: string) {
    this.empleoyeRepository.delete({
      employeeId: id
    })
    return {
      message: "Employee delete"
    }
  }
}
