import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { join } from 'path';
import { CampanhaController } from '../controllers/campanha.controller';
import { CampanhaService } from '../services/campanha.service';
import { Campanha } from '../entities/campanha.entity';
import { AuthModule } from './auth.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [join(process.cwd(), 'dist/**/*.entity.js')],
        synchronize: configService.get('ENV') === 'dev' ? true : false,
      }),
    }),
    TypeOrmModule.forFeature([Campanha]),
    AuthModule,
  ],
  controllers: [AppController, CampanhaController],
  providers: [AppService, CampanhaService],
})
export class AppModule {}
