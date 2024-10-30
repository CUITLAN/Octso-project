import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Manager } from 'src/manager/entities/manager.entity';
import { ManagerModule } from 'src/manager/manager.module';

@Module({
  imports:[TypeOrmModule.forFeature([Location, Manager]), ManagerModule],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
