import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { estado } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateComercianteDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  NombreRazonSocial: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  Municipio: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  Telefono: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  CorreoElectronico: string;

  @IsOptional()
  @IsNumber()
  UsuarioId: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  Estado: estado;

  @ApiProperty()
  @IsOptional()
  @IsString()
  FechaRegistro: string;
}
