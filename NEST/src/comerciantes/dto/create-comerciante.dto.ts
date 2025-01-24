import { estado } from '@prisma/client';
import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateComercianteDto {
  @IsString()
  @IsNotEmpty()
  NombreRazonSocial: string;

  @IsString()
  @IsNotEmpty()
  Municipio: string;

  @IsOptional()
  @IsString()
  Telefono: string;

  @IsOptional()
  @IsEmail()
  CorreoElectronico: string;

  @IsOptional()
  Estado: estado;

  @IsOptional()
  UsuarioId: number;

  @IsOptional()
  @IsString()
  FechaRegistro: string;
}
