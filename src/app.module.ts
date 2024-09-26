import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmpleoyesModule } from './empleoyes/empleoyes.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvidersModule } from './providers/providers.module';
import { ManagerModule } from './manager/manager.module';
import { LocationModule } from './location/location.module';
import { RegionModule } from './region/region.module';


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
    EmpleoyesModule, ProductsModule, ProvidersModule, ManagerModule, LocationModule, RegionModule],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
