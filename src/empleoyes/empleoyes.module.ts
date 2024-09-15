import { Module } from '@nestjs/common';
import { EmpleoyesService } from './empleoyes.service';
import { EmpleoyesController } from './empleoyes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empleoye } from './entities/empleoye.entity';

@Module({
  imports :[
    TypeOrmModule.forFeature([Empleoye])
  ],
  controllers: [EmpleoyesController],
  providers: [EmpleoyesService],
})
export class EmpleoyesModule {}
