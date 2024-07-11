import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from '../guard/auth.guard';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { UsuarioService } from '../services/usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get('SECRET'),
        signOptions: {
          expiresIn: configService.get('EXPIRESIN'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    UsuarioService,
    AuthService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
