import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmpleoyesModule } from './empleoyes/empleoyes.module';

@Module({
  imports: [EmpleoyesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
