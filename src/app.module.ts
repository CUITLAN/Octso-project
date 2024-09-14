import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmpleoyesModule } from './empleoyes/empleoyes.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [EmpleoyesModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
