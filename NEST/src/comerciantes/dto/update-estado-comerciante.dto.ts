import { estado } from '@prisma/client';
import { IsString, IsNotEmpty } from 'class-validator';

export class EstadoDto {
  @IsString()
  @IsNotEmpty()
  Estado: estado;
}
