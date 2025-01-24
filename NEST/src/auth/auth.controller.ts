import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async login(
    @Body() loginDto: { correoElectronico: string; contrasena: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(
      loginDto.correoElectronico,
      loginDto.contrasena,
      res,
    );
  }
}
