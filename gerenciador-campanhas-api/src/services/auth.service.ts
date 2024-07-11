import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from './usuario.service';
import { UsuarioDto } from '../dto/usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}
  async acessar(email: string, pass: string) {
    const usuario = await this.usuarioService.obterPorEmail(email);
    if (!usuario) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }
    const isMatch = await bcrypt.compare(pass, usuario.hashPassword);
    if (!isMatch) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }
    const payload = { sub: usuario.id, email: usuario.email };
    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
  async cadastrar(payload: UsuarioDto) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(payload.password, saltOrRounds);
    const user = await this.usuarioService.cadastrar(payload, hash);
    return user;
  }
}
