import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Patch,
  Param,
  Delete,
  UseGuards,
  Header,
} from '@nestjs/common';
import { ComerciantesService } from './comerciantes.service';
import { CreateComercianteDto } from './dto/create-comerciante.dto';
import { UpdateComercianteDto } from './dto/update-comerciante.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { PaginacionComercianteDto } from './dto/paginacion-comerciante.dto';

@Controller('comerciantes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ComerciantesController {
  constructor(private readonly comerciantesService: ComerciantesService) {}

  @Post()
  @Roles('ADMINISTRADOR', 'AUXILIARDEREGISTRO')
  create(
    @Body() createComercianteDto: CreateComercianteDto,
    @Request() req: any,
  ) {
    const userId: number = parseInt(req.user.Id);
    createComercianteDto.Estado = 'ACTIVO';
    createComercianteDto.UsuarioId = userId;
    return this.comerciantesService.create(createComercianteDto);
  }

  @Post('/paginacion')
  @Roles('ADMINISTRADOR', 'AUXILIARDEREGISTRO')
  findAll(@Body() paginacionComercianteDto: PaginacionComercianteDto) {
    return this.comerciantesService.findAll(paginacionComercianteDto);
  }

  @Roles('ADMINISTRADOR', 'AUXILIARDEREGISTRO')
  @Get(':id')
  findOne(@Param('id') id: string) {
    const idComerciante = parseInt(id);
    return this.comerciantesService.findOne(idComerciante);
  }

  @Roles('ADMINISTRADOR', 'AUXILIARDEREGISTRO')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateComercianteDto: UpdateComercianteDto,
    @Request() req,
  ) {
    const idComerciante = parseInt(id);
    const userId: number = parseInt(req.user.Id);
    updateComercianteDto.UsuarioId = userId;
    return this.comerciantesService.update(idComerciante, updateComercianteDto);
  }

  @Patch(':id/estado')
  @Roles('ADMINISTRADOR', 'AUXILIARDEREGISTRO')
  async updateEstado(@Param('id') id: string) {
    const idComerciante = parseInt(id);
    return await this.comerciantesService.toggleEstado(idComerciante);
  }

  @Roles('ADMINISTRADOR')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comerciantesService.remove(+id);
  }

  @Get('/export')
  @Roles('ADMINISTRADOR')
  @Header('Content-Type', 'text/csv')
  @Header('Content-Disposition', 'attachment; filename=comerciantes.csv')
  async exportToCsv() {
    return await this.comerciantesService.generateCsv();
  }
}
