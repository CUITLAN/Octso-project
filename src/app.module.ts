import { Module } from '@nestjs/common';

import { EmpleoyesModule } from './empleoyes/empleoyes.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvidersModule } from './providers/providers.module';
import { ManagerModule } from './manager/manager.module';
import { LocationModule } from './location/location.module';
import { RegionModule } from './region/region.module';
import { AuthModule } from './auth/auth.module';


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
    EmpleoyesModule, ProductsModule, ProvidersModule, ManagerModule, LocationModule, RegionModule, AuthModule],
  
  controllers: [],
  providers: [],
})
export class AppModule {}
