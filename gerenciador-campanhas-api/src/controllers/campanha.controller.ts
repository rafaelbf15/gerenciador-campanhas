import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  UsePipes,
  Query,
} from '@nestjs/common';
import { CampanhaService } from '../services/campanha.service';
import { CampanhaDto } from '../dto/campanha.dto';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CampanhaValidationPipe } from '../pipes/campanha-validation.pipe';
import { Status } from '../enums/status.enum';
import { Categoria } from '../enums/categoria.enum';

@ApiBearerAuth()
@ApiTags('api/campanha')
@Controller('api/campanha')
export class CampanhaController {
  constructor(private readonly campanhaService: CampanhaService) {}

  @Post()
  @ApiBody({ type: CampanhaDto })
  @UsePipes(CampanhaValidationPipe)
  @ApiQuery({ name: 'status', enum: Status })
  @ApiQuery({ name: 'categoria', enum: Categoria })
  async cadastrar(
    @Res() response,
    @Query('status') status: string,
    @Query('categoria') categoria: string,
    @Body() campanhaDto: CampanhaDto,
  ) {
    campanhaDto.status = campanhaDto.status || status;
    campanhaDto.categoria = campanhaDto.categoria || categoria;
    await this.campanhaService.cadastrarCampanha(campanhaDto);
    response.status(201).send();
  }

  @Get()
  async obterTodos(@Res() response) {
    const campanhas = await this.campanhaService.obterCampanhas();
    if (campanhas?.length > 0) response.status(200).send(campanhas);
    else response.status(204).send();
  }

  @Get(':id')
  async obterPorId(@Res() response, @Param('id') id: string) {
    const campanha = await this.campanhaService.obterCampanhaPorId(id);
    if (campanha) response.status(200).send(campanha);
    else response.status(204).send();
  }

  @Put(':id')
  @ApiBody({ type: CampanhaDto })
  @UsePipes(CampanhaValidationPipe)
  @ApiQuery({ name: 'status', enum: Status })
  @ApiQuery({ name: 'categoria', enum: Categoria })
  async atualizar(
    @Res() response,
    @Param('id') id: string,
    @Query('status') status: string,
    @Query('categoria') categoria: string,
    @Body() campanhaDto: CampanhaDto,
  ) {
    campanhaDto.status = campanhaDto.status || status;
    campanhaDto.categoria = campanhaDto.categoria || categoria;
    await this.campanhaService.atualizarCampanha(id, campanhaDto);
    response.status(200).send();
  }

  @Delete(':id')
  async remover(@Res() response, @Param('id') id: string) {
    await this.campanhaService.removerCampanha(id);
    response.status(200).send();
  }
}
