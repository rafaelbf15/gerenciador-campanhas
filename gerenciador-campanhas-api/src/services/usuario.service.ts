import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioDto } from '../dto/usuario.dto';
import { Usuario } from '../entities/usuario.entity';
import { Repository } from 'typeorm';
@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}
  async obterPorEmail(email: string): Promise<Usuario | undefined> {
    return await this.usuarioRepository.findOneBy({ email: email });
  }

  async cadastrar(usuarioDto: UsuarioDto, hash: string) {
    let usuario = await this.obterPorEmail(usuarioDto.email);
    if (usuario) throw new BadRequestException('Usuário já cadastrado');
    usuario = this.usuarioRepository.create(usuarioDto);
    usuario.updateHashPassword(hash);
    await this.usuarioRepository.save(usuario);
  }

  async atualizar(usuarioDto: UsuarioDto) {
    const usuario = await this.obterPorEmail(usuarioDto.email);
    if (!usuario) throw new BadRequestException('Usuário não encontrado');
    Object.assign(usuario, usuarioDto);
    await this.usuarioRepository.save(usuario);
  }
}
