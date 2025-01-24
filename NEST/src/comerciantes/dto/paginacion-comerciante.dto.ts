import { IsOptional, IsString, IsDateString, IsEnum, IsNumber } from 'class-validator';
import { estado } from '@prisma/client';

export class PaginacionComercianteDto {
  @IsOptional()
  @IsString()
  NombreRazonSocial?: string;

  @IsOptional()
  @IsDateString()
  FechaRegistro?: string;

  @IsOptional()
  @IsEnum(estado)
  Estado?: estado;

  @IsOptional()
  @IsNumber()
  Page?: number = 1;

  @IsOptional()
  @IsNumber()
  elementosPorPagina?: number = 5;
}
