import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { estado } from '@prisma/client';

export class UpdateComercianteDto {
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
  @IsNumber()
  UsuarioId: number;

  @IsOptional()
  @IsString()
  Estado: estado;

  @IsOptional()
  @IsString()
  FechaRegistro: string;
}
