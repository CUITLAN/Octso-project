import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmpleoyesService } from './empleoyes.service';
import { CreateEmpleoyeDto } from './dto/create-empleoye.dto';
import { UpdateEmpleoyeDto } from './dto/update-empleoye.dto';

@Controller('empleoyees')
export class EmpleoyesController {
  constructor(private readonly empleoyesService: EmpleoyesService) {}

  @Post()
  create(@Body() createEmpleoyeDto: CreateEmpleoyeDto) {
    return this.empleoyesService.create(createEmpleoyeDto);
  }

  @Get()
  findAll() {
    return this.empleoyesService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') 
  id: string) {
    return this.empleoyesService.findOne(parseInt(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmpleoyeDto: UpdateEmpleoyeDto) {
    return this.empleoyesService.update(+id, updateEmpleoyeDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.empleoyesService.remove(+id);
  }
}
