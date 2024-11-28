import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { AuthUser } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/constants/roles.constats';
import { ApiAuth } from 'src/auth/decorators/api.decorator';
import { ApiTags } from '@nestjs/swagger';
@ApiAuth()
@ApiTags('Managers')
@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}
  @AuthUser(ROLES.ADMIN)
  @Post()
  create(@Body() createManagerDto: CreateManagerDto) {
    return this.managerService.create(createManagerDto);
  }
  @AuthUser(ROLES.ADMIN)
  @Get()
  findAll() {
    return this.managerService.findAll();
  }
  @AuthUser(ROLES.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.managerService.findOne(id);
  }
  @AuthUser(ROLES.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManagerDto: UpdateManagerDto) {
    console.log("EN el controller si hay de managerpaso")
    return this.managerService.update(id, updateManagerDto);
  }
  @AuthUser(ROLES.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managerService.remove(id);
  }
}
