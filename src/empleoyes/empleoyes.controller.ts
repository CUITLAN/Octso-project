import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EmpleoyesService } from './empleoyes.service';
import { CreateEmpleoyeDto } from './dto/create-empleoye.dto';
import { UpdateEmpleoyeDto } from './dto/update-empleoye.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthUser } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/constants/roles.constats'; 
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Empleoye } from './entities/empleoye.entity';
import { ApiAuth } from 'src/auth/decorators/api.decorator';
@ApiAuth()
@ApiTags('Empleoyees')
@Controller('empleoyees')
export class EmpleoyesController {
  constructor(private readonly empleoyesService: EmpleoyesService) {}
  @ApiResponse({
    status:201,
    example:{
      employeeId: "UUID",
      Empleoyeemail: "Alan78707@gmail.com",
      Empleoyename: "Alan Orlando",
      EmpleoyelastName: "Trejo Tinajero",
      
    } as Empleoye,

  })
  
  @AuthUser(ROLES.MANAGER)
  @Post()
  create(@Body() createEmpleoyeDto: CreateEmpleoyeDto) {
    return this.empleoyesService.create(createEmpleoyeDto);
  }

  @AuthUser(ROLES.MANAGER)
  @Get()
  findAll() {
    return this.empleoyesService.findAll();
  }
  @AuthUser(ROLES.MANAGER)
  @Get('/:id')
  findOne(@Param('id', new ParseUUIDPipe({version: '4'})) 
  id: string) {
    return this.empleoyesService.findOne(id);
  }

  @AuthUser(ROLES.MANAGER)
  @Get('/location/:id')
  findAllLocation(@Param('id')id: string){
    return this.empleoyesService.findByLocation(+id)
  }

  @AuthUser(ROLES.EMPLEOYEE)
  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({version: '4'})) id: string, @Body() updateEmpleoyeDto: UpdateEmpleoyeDto) {
    return this.empleoyesService.update(id, updateEmpleoyeDto);
  }
  @AuthUser(ROLES.MANAGER)
  @Delete('/:id')
  remove(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.empleoyesService.remove(id);
  }
  @AuthUser(ROLES.MANAGER, ROLES.EMPLEOYEE)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file',{
    dest:"./src/employees/employees-photos"
  }))
  uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    console.log(file); 
    return { message: 'File uploaded successfully', file };
  }
}
