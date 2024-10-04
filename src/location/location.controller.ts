import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { AuthUser } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/constants/roles.constats'; 
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}
  @AuthUser()
  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @AuthUser(ROLES.EMPLEOYEE, ROLES.ADMIN, ROLES.MANAGER)
  @Get()
  findAll() {
    return this.locationService.findAll();
  }
  @AuthUser(ROLES.EMPLEOYEE, ROLES.ADMIN, ROLES.MANAGER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationService.findOne(+id);
  }
  @AuthUser()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationService.update(+id, updateLocationDto);
  }

  @AuthUser()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationService.remove(+id);
  }
}
