import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(correoElectronico: string, contrasena: string, res: Response) {
    const usuario = await this.prisma.usuario.findFirst({
      where: { CorreoElectronico: correoElectronico },
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = usuario.Contrasena === contrasena;

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      Id: usuario.Id,
      Rol: usuario.Rol,
    };

    const token = this.jwtService.sign(payload);

    res
      .cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60,
        path: '/',
        secure: false,
      })
      .send({
        Nombre: usuario.Nombre,
        Rol: usuario.Rol,
      });
  }
}
