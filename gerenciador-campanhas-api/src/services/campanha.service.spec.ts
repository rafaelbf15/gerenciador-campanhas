import { Test, TestingModule } from '@nestjs/testing';
import { CampanhaService } from './campanha.service';
import { CampanhaDto } from '../dto/campanha.dto';
import { Campanha } from '../entities/campanha.entity';
import { Repository } from 'typeorm';
import { Status } from '../enums/status.enum';
import { Categoria } from '../enums/categoria.enum';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CampanhaService', () => {
  let service: CampanhaService;
  let repository: Repository<Campanha>;

  const CAMPANHA_REPOSITRY_TOKEN = getRepositoryToken(Campanha);

  const dataAtual = new Date();
  const campanhaDto: CampanhaDto = {
    id: 'cbb50b12-87db-4476-933b-d8bc29e1aec8',
    dataInicio: dataAtual,
    dataFim: new Date(
      dataAtual.getFullYear(),
      dataAtual.getMonth(),
      dataAtual.getDate() + 7,
    ),
    nome: 'Campanha de teste',
    status: Status.Ativa,
    categoria: Categoria.Reconhecimento,
    removido: false,
    dataCadastro: new Date(),
  };

  const createdCampanha: Campanha = Object.assign({}, campanhaDto, {
    dataCadastro: new Date(),
  });

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        CampanhaService,
        {
          provide: CAMPANHA_REPOSITRY_TOKEN,
          useClass: Repository,
        },
      ],
    }).compile();

    service = moduleRef.get<CampanhaService>(CampanhaService);
    repository = moduleRef.get<Repository<Campanha>>(CAMPANHA_REPOSITRY_TOKEN);
  });

  describe('cadastrarCampanha', () => {
    it('deve criar uma campanha', async () => {
      jest.spyOn(repository, 'create').mockReturnValue(createdCampanha);
      jest.spyOn(repository, 'save').mockResolvedValue(createdCampanha);

      const result = await service.cadastrarCampanha(campanhaDto);

      expect(repository.create).toHaveBeenCalledWith(campanhaDto);
      expect(repository.save).toHaveBeenCalledWith(createdCampanha);
      expect(result).toEqual(createdCampanha);
    });
  });

  describe('obterCampanhas', () => {
    it('deve retornar todas as campanhas', async () => {
      const campanhas: Campanha[] = [createdCampanha];

      jest.spyOn(repository, 'find').mockResolvedValue(campanhas);

      const result = await service.obterCampanhas();

      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(campanhas);
    });
  });

  describe('obterCampanhaPorId', () => {
    it('deve retornar campanha por Id', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(createdCampanha);
      const result = await service.obterCampanhaPorId(createdCampanha.id);
      expect(result).toEqual(createdCampanha);
    });
  });

  describe('atualizarCampanha', () => {
    it('deve atualizar a campanha', async () => {
      const id = createdCampanha.id;
      const updatedCampanha: Campanha = Object.assign({}, createdCampanha);
      updatedCampanha.dataFim = new Date(createdCampanha.dataFim.getDate() + 7);

      jest.spyOn(repository, 'findOne').mockResolvedValue(updatedCampanha);
      jest.spyOn(repository, 'save').mockResolvedValue(updatedCampanha);

      const result = await service.atualizarCampanha(id, updatedCampanha);

      expect(result).toEqual(updatedCampanha);
    });
  });

  describe('removerCampanha', () => {
    it('deve remover a campanha', async () => {
      const id = createdCampanha.id;
      const removedCampanha: Campanha = Object.assign({}, createdCampanha);
      removedCampanha.removido = true;
      removedCampanha.status = Status.Expirada;

      jest.spyOn(repository, 'findOne').mockResolvedValue(removedCampanha);
      jest.spyOn(repository, 'save').mockResolvedValue(removedCampanha);

      const result = await service.removerCampanha(id);

      expect(result).toEqual(removedCampanha);
    });
  });
});
