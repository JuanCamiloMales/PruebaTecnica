import { ApiProperty } from '@nestjs/swagger';
import { estado } from '@prisma/client';
import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateComercianteDto {
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
  Estado: estado;

  @IsOptional()
  UsuarioId: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  FechaRegistro: string;
}
