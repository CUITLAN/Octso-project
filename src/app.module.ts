import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmpleoyesModule } from './empleoyes/empleoyes.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvidersModule } from './providers/providers.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Lacontraseña',
      database: 'ocsoDB',
      entities:[],
      autoLoadEntities: true,
      synchronize: true,
    }),
    EmpleoyesModule, ProductsModule, ProvidersModule],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
