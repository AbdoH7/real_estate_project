import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from './config/typeorm'
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DeveloperModule } from './developer/developer.module';
import { ProjectModule } from './project/project.module';
import { UnitModule } from './unit/unit.module';

@Module({
  imports: [
   ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
     useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
      const config = configService.get<TypeOrmModuleOptions>('typeorm');

      if (!config) {
        throw new Error('TypeORM configuration is missing or invalid');
      }

      return config;
    },
  }),
    DeveloperModule,
    ProjectModule,
    UnitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
