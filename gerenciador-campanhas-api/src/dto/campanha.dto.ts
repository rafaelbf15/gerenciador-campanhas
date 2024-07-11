import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsString,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'dataFimMaiorQueDataInicio', async: false })
class DataFimMaiorQueDataInicio implements ValidatorConstraintInterface {
  validate(dataFim: Date, args: ValidationArguments) {
    const { object } = args;
    return dataFim > object['dataInicio'];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(args: ValidationArguments) {
    return 'A data fim deve ser sempre maior que a dataInicio';
  }
}

@ValidatorConstraint({
  name: 'dataInicioIgualOuMaiorQueDataAtual',
  async: false,
})
class DataInicioIgualOuMaiorQueDataAtual
  implements ValidatorConstraintInterface
{
  validate(dataInicio: Date) {
    const dataInicioUTC = new Date(
      dataInicio.getTime() + dataInicio.getTimezoneOffset() * 60000,
    );
    return dataInicioUTC >= new Date();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(args: ValidationArguments) {
    return 'A data de início deve ser igual ou maior que a data atual';
  }
}

export class CampanhaDto {
  id: string;

  @ApiProperty()
  @IsString()
  nome: string;

  dataCadastro?: Date;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  @Validate(DataInicioIgualOuMaiorQueDataAtual)
  dataInicio: Date;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  @Validate(DataFimMaiorQueDataInicio)
  dataFim: Date;

  @ApiProperty()
  status: string;

  @ApiProperty()
  categoria: string;

  removido: boolean;
}
