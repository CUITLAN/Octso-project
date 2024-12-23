import { Module } from '@nestjs/common';

import { EmpleoyesModule } from './empleoyes/empleoyes.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvidersModule } from './providers/providers.module';
import { ManagerModule } from './manager/manager.module';
import { LocationModule } from './location/location.module';
import { RegionModule } from './region/region.module';
import { AuthModule } from './auth/auth.module';
import { AwsModule } from './aws/aws.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
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
    EmpleoyesModule, ProductsModule, ProvidersModule, ManagerModule, LocationModule, RegionModule, AuthModule, AwsModule],
  
  controllers: [],
  providers: [],
})
export class AppModule {}
