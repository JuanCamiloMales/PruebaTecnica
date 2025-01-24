import { Module } from '@nestjs/common';
import { ComerciantesService } from './comerciantes.service';
import { ComerciantesController } from './comerciantes.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ComerciantesController],
  providers: [ComerciantesService, PrismaService],
})
export class ComerciantesModule {}
