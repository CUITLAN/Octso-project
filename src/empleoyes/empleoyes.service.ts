import { Injectable } from '@nestjs/common';
import { CreateEmpleoyeDto } from './dto/create-empleoye.dto';
import { UpdateEmpleoyeDto } from './dto/update-empleoye.dto';

@Injectable()
export class EmpleoyesService {
  private  empleoyees: CreateEmpleoyeDto[] = [{
    id: 0,
    name: 'Alan',
    lastName: 'Costa',
    phone: 'Realme ',
  },
  {
    id: 1,
    name: 'Grecia',
    lastName: 'Tinajero',
    phone: '41233433'
  }
  
]
  create(createEmpleoyeDto: CreateEmpleoyeDto) {
    createEmpleoyeDto.id = this.empleoyees.length + 1;
    this.empleoyees.push(createEmpleoyeDto)
    return this.empleoyees;
  }

  findAll() {
    return this.empleoyees;
  }

  findOne(id: number) {
    const employee = this.empleoyees.filter((employee)=>employee.id===id)
    return employee;
  }

  update(id: number, updateEmpleoyeDto: UpdateEmpleoyeDto) {
    let newempleoyee = this.findOne(id);
    newempleoyee={
      ...newempleoyee,
      ...updateEmpleoyeDto,
    }
    this.empleoyees=this.empleoyees.map((empleoyee)=>{
      if (empleoyee.id === id){
        empleoyee=empleoyee
      }
      return empleoyee
    })
    return newempleoyee ;
  }

  remove(id: number) {
    this.empleoyees = this.empleoyees.filter((empleoyees)=> empleoyees.id !== id);
    return this.empleoyees;
  }
}
