import { Test, TestingModule } from '@nestjs/testing';
import { ComerciantesService } from './comerciantes.service';
import { PrismaService } from '../prisma/prisma.service';
import { Comerciante } from '@prisma/client';

describe('ComerciantesService', () => {
  let service: ComerciantesService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComerciantesService, PrismaService],
    }).compile();

    service = module.get<ComerciantesService>(ComerciantesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a comerciante by ID', async () => {
      const mockComerciante: Comerciante = {
        Id: 1,
        NombreRazonSocial: 'Comerciante 1',
        Municipio: 'Medellín',
        Telefono: '321654987',
        CorreoElectronico: 'Comerciante1@Comerciante1.com',
        FechaRegistro: new Date('2025-01-23 00:00:00'),
        Estado: 'ACTIVO',
        FechaActualizacion: null,
        UsuarioId: 1,
      };

      jest
        .spyOn(prismaService.comerciante, 'findUnique')
        .mockResolvedValue(mockComerciante);

      const result = await service.findOne(1);
      expect(result).toEqual(mockComerciante);
    });

    it('should throw an error if comerciante not found', async () => {
      jest
        .spyOn(prismaService.comerciante, 'findUnique')
        .mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(
        'Comerciante no encontrado',
      );
    });
  });
});
