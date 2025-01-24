import { Injectable } from '@nestjs/common';
import { CreateComercianteDto } from './dto/create-comerciante.dto';
import { UpdateComercianteDto } from './dto/update-comerciante.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginacionComercianteDto } from './dto/paginacion-comerciante.dto';

@Injectable()
export class ComerciantesService {
  constructor(private prismaService: PrismaService) {}

  create(createComercianteDto: CreateComercianteDto) {
    return this.prismaService.comerciante.create({
      data: createComercianteDto,
    });
  }

  async findAll(paginacionComercianteDto: PaginacionComercianteDto) {
    const pageSize: number = paginacionComercianteDto.elementosPorPagina || 5;
    const page = paginacionComercianteDto.Page || 1;
    const skip = (page - 1) * pageSize;

    const where = {
      ...(paginacionComercianteDto.NombreRazonSocial && {
        NombreRazonSocial: {
          contains: paginacionComercianteDto.NombreRazonSocial,
          mode: 'insensitive' as const,
        },
      }),
      ...(paginacionComercianteDto.FechaRegistro && {
        FechaRegistro: {
          equals: new Date(paginacionComercianteDto.FechaRegistro),
        },
      }),
      ...(paginacionComercianteDto.Estado && {
        Estado: paginacionComercianteDto.Estado,
      }),
    };

    const [comerciantes, total] = await Promise.all([
      this.prismaService.comerciante.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: {
          NombreRazonSocial: 'desc',
        },
      }),
      this.prismaService.comerciante.count({ where }),
    ]);

    return {
      data: comerciantes,
      total,
      page,
      pageSize,
    };
  }

  findOne(id: number) {
    return this.prismaService.comerciante.findUnique({
      where: { Id: id },
    });
  }

  update(id: number, updateComercianteDto: UpdateComercianteDto) {
    console.log(updateComercianteDto);
    return this.prismaService.comerciante.update({
      where: { Id: id },
      data: updateComercianteDto,
    });
  }

  remove(id: number) {
    return this.prismaService.comerciante.delete({
      where: { Id: id },
    });
  }

  async toggleEstado(id: number) {
    const Comerciante = await this.prismaService.comerciante.findUnique({
      where: { Id: id },
    });
    if (!Comerciante) {
      throw new Error('Comerciante no encontrado');
    }
    const estado = Comerciante.Estado === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';
    return this.prismaService.comerciante.update({
      where: { Id: id },
      data: {
        Estado: estado,
      },
    });
  }

  async generateCsv(): Promise<string> {
    const comerciantes = await this.prismaService.comerciante.findMany({
      where: {
        Estado: 'ACTIVO',
      },
      include: {
        Establecimientos: true,
      },
    });

    const csvData = comerciantes.map((comerciante) => {
      const cantidadEstablecimientos =
        comerciante.Establecimientos?.length || 0;

      const totalIngresos =
        comerciante.Establecimientos?.reduce(
          (sum, est) => sum + (est.Ingresos || 0),
          0,
        ) || 0;

      const cantidadEmpleados =
        comerciante.Establecimientos?.reduce(
          (sum, est) => sum + (est.NumEmpleados || 0),
          0,
        ) || 0;

      return {
        NombreRazonSocial: comerciante.NombreRazonSocial,
        Municipio: comerciante.Municipio,
        Telefono: comerciante.Telefono || '',
        CorreoElectronico: comerciante.CorreoElectronico || '',
        FechaRegistro: comerciante.FechaRegistro,
        Estado: comerciante.Estado,
        CantidadEstablecimientos: cantidadEstablecimientos,
        TotalIngresos: totalIngresos,
        CantidadEmpleados: cantidadEmpleados,
      };
    });

    const headers = [
      'NombreRazonSocial',
      'Municipio',
      'Telefono',
      'CorreoElectronico',
      'FechaRegistro',
      'Estado',
      'CantidadEstablecimientos',
      'TotalIngresos',
      'CantidadEmpleados',
    ].join('|');

    const rows = csvData.map((data) => Object.values(data).join('|'));
    return [headers, ...rows].join('\n');
  }
}
