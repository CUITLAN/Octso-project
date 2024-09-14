import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmpleoyeDto } from './dto/create-empleoye.dto';
import { UpdateEmpleoyeDto } from './dto/update-empleoye.dto';
import {v4 as uuid} from 'uuid';


@Injectable()
export class EmpleoyesService {
  private  empleoyees: CreateEmpleoyeDto[] = [{
    id: uuid(),
    name: 'Alan',
    lastName: 'Costa',
    phone: 'Realme ',
  },
  {
    id: uuid(),
    name: 'Grecia',
    lastName: 'Tinajero',
    phone: '41233433'
  }
  
]
  create(createEmpleoyeDto: CreateEmpleoyeDto) {
    createEmpleoyeDto.id = uuid();
    this.empleoyees.push(createEmpleoyeDto)
    return this.empleoyees;
  }

  findAll() {
    return this.empleoyees;
  }

  findOne(id: string) {
    const employee = this.empleoyees.filter((employee)=>employee.id===id)
    if (!employee) throw new NotFoundException();

    return employee;
  }

  update(id: string, updateEmpleoyeDto: UpdateEmpleoyeDto) {
    let newempleoyee = this.findOne(id);
    newempleoyee={
      ...newempleoyee,
      ...updateEmpleoyeDto,
    }
    if (newempleoyee) throw new NotFoundException();
    this.empleoyees=this.empleoyees.map((empleoyee)=>{
      if (empleoyee.id === id){
        empleoyee=empleoyee
      }
      return empleoyee
    })
    return newempleoyee ;
  }

  remove(id: string) {
    this.findOne(id);
    this.empleoyees = this.empleoyees.filter((empleoyees)=> empleoyees.id !== id);

    return this.empleoyees;
  }
}
