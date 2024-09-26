import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EmpleoyesService } from './empleoyes.service';
import { CreateEmpleoyeDto } from './dto/create-empleoye.dto';
import { UpdateEmpleoyeDto } from './dto/update-empleoye.dto';
import { FileInterceptor } from '@nestjs/platform-express';
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
  findOne(@Param('id', new ParseUUIDPipe({version: '4'})) 
  id: string) {
    return this.empleoyesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({version: '4'})) id: string, @Body() updateEmpleoyeDto: UpdateEmpleoyeDto) {
    return this.empleoyesService.update(id, updateEmpleoyeDto);
  }

  @Delete('/:id')
  remove(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.empleoyesService.remove(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file',{
    dest:"./src/employees/employees-photos"
  }))
  uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    console.log(file); 
    return { message: 'File uploaded successfully', file };
  }
}
