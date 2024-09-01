import { Module } from '@nestjs/common';
import { EmpleoyesService } from './empleoyes.service';
import { EmpleoyesController } from './empleoyes.controller';

@Module({
  controllers: [EmpleoyesController],
  providers: [EmpleoyesService],
})
export class EmpleoyesModule {}
