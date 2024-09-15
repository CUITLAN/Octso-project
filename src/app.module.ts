import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmpleoyesModule } from './empleoyes/empleoyes.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Lacontraseña',
      database: process.env.name,
      entities:[],
      autoLoadEntities: true,
      synchronize: true,
    }),
    EmpleoyesModule, ProductsModule],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
