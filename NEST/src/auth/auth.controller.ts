import { Controller, Post, Body, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        correoElectronico: { type: 'string' },
        contrasena: { type: 'string' },
      },
    },
  })
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
