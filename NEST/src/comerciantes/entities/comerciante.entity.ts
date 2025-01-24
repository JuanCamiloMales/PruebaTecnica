import { IsString, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class Comerciante {
  @IsNumber()
  @IsNotEmpty()
  Id: number;

  @IsString()
  @IsNotEmpty()
  NombreRazonSocial: string;

  @IsString()
  @IsNotEmpty()
  Municipio: string;

  @IsString()
  @IsNotEmpty()
  Telefono: string;

  @IsEmail()
  @IsNotEmpty()
  CorreoElectronico: string;

  @IsString()
  @IsNotEmpty()
  Estado: string;

  @IsNumber()
  @IsNotEmpty()
  UsuarioId: number;
}
