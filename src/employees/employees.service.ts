import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { v4 as uuid } from "uuid";
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { User } from 'src/auth/entities/user.entity'; 
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'; 

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ){}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const { employeePassword, ...employeeData } = createEmployeeDto;
    const newUser = this.userRepository.create({
      userEmail: employeeData.employeeEmail,
      userPassword: bcrypt.hashSync(employeePassword, 5),
      userRoles: ["Employee"]
    });
    
    const savedUser = await this.userRepository.save(newUser);
    const newEmployee = this.employeeRepository.create({
      ...employeeData,
      user: savedUser
    });

    return this.employeeRepository.save(newEmployee);
  }
  findAll() {
    return this.employeeRepository.find({
      relations: {
        location: true,
        user: true,
      }
    });
  }

  findByLocation(id: number) {
    return this.employeeRepository.findBy({
      location: {
        locationId: id
      }
    })
  }

  findOne(id: string) {
    const employee = this.employeeRepository.findOne({
      where : {
        employeeId: id
      },
      relations: {
        location: true,
        user: true,
      }
    })
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeToUpdate = await this.employeeRepository.preload({
      employeeId: id,
      ...updateEmployeeDto
    })
    this.employeeRepository.save(employeeToUpdate)
    return employeeToUpdate;
  }

  remove(id: string) {
    this.employeeRepository.delete({
      employeeId: id
    })
    return {
      message: "Employee deleted"
    }
  }
}
