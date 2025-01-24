import { IsOptional, IsString, IsDateString, IsEnum, IsNumber } from 'class-validator';
import { estado } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class PaginacionComercianteDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  NombreRazonSocial?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  FechaRegistro?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(estado)
  Estado?: estado;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  Page?: number = 1;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  elementosPorPagina?: number = 5;
}
