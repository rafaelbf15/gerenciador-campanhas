import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../dto/login.dto';
import { UsuarioDto } from '../dto/usuario.dto';
import { Public } from '../guard/auth.guard';
import { CampanhaValidationPipe } from '../pipes/campanha-validation.pipe';
import { AuthService } from '../services/auth.service';

@ApiTags('api/auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Autenticar' })
  @ApiResponse({
    status: 200,
    type: [UsuarioDto],
  })
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.acessar(loginDto.email, loginDto.password);
  }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('cadastro')
  @ApiOperation({ summary: 'Cadastrar' })
  @UsePipes(CampanhaValidationPipe)
  @ApiResponse({
    status: 200,
    type: [UsuarioDto],
  })
  signUp(@Body() usuarioDto: UsuarioDto) {
    return this.authService.cadastrar(usuarioDto);
  }
}
