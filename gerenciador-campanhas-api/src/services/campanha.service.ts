import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CampanhaDto } from '../dto/campanha.dto';
import { Campanha } from '../entities/campanha.entity';
import { Status } from '../enums/status.enum';
import { Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CampanhaService {
  constructor(
    @InjectRepository(Campanha)
    private readonly campanhaRepository: Repository<Campanha>,
  ) {}

  async cadastrarCampanha(campanhaDto: CampanhaDto) {
    const campanha = this.campanhaRepository.create(campanhaDto);
    return await this.campanhaRepository.save(campanha);
  }

  async obterCampanhas() {
    return await this.campanhaRepository.find({
      order: { dataCadastro: 'DESC', nome: 'ASC' },
    });
  }

  async obterCampanhaPorId(id: string) {
    return await this.campanhaRepository.findOne({
      where: { id },
    });
  }

  async atualizarCampanha(id: string, campanhaDto: CampanhaDto) {
    const campanha = await this.obterCampanhaPorId(id);
    if (!campanha) throw new BadRequestException('Campanha não encontrada');
    Object.assign(campanha, campanhaDto);
    if (campanha.status == Status.Ativa) {
      campanha.removido = false;
    }
    return await this.campanhaRepository.save(campanha);
  }

  async removerCampanha(id: string) {
    const campanha = await this.obterCampanhaPorId(id);
    if (!campanha) throw new BadRequestException('Campanha não encontrada');
    campanha.removido = true;
    campanha.status = Status.Expirada;
    return await this.campanhaRepository.save(campanha);
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async atualizarCampanhasDataFimInforiorDataAtual() {
    try {
      await this.campanhaRepository
        .createQueryBuilder()
        .update(Campanha)
        .set({
          status: Status.Expirada,
        })
        .where('dataFim < :dataAtual', { dataAtual: new Date() })
        .execute();
    } catch (error) {
      console.error('Erro ao atualizar campanhas', error);
    }
  }
}
