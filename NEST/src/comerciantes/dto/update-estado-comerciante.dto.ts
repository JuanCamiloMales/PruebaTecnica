import { ApiProperty } from '@nestjs/swagger';
import { estado } from '@prisma/client';
import { IsString, IsNotEmpty } from 'class-validator';

export class EstadoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  Estado: estado;
}
