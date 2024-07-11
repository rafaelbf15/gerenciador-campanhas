import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'passwordNotMatch', async: false })
class PasswordNotMatch implements ValidatorConstraintInterface {
  validate(password: Date, args: ValidationArguments) {
    const { object } = args;
    return password == object['confirmPassword'];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(args: ValidationArguments) {
    return 'As senhas não conferem';
  }
}
export class UsuarioDto {
  @ApiProperty()
  nome: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Validate(PasswordNotMatch)
  password: string;

  @ApiProperty()
  confirmPassword?: string;
}
