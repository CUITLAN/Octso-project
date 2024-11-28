import { Module } from '@nestjs/common';
import { EmpleoyesService } from './empleoyes.service';
import { EmpleoyesController } from './empleoyes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empleoye } from './entities/empleoye.entity';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports :[
    TypeOrmModule.forFeature([Empleoye]), AwsModule
  ],
  controllers: [EmpleoyesController],
  providers: [EmpleoyesService],
})
export class EmpleoyesModule {}
