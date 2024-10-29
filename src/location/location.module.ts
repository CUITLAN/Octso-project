import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { ManagerController } from 'src/manager/manager.controller';
import { Manager } from 'src/manager/entities/manager.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Location, Manager]), ManagerController],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
