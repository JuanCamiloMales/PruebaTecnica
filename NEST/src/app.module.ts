import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ComerciantesModule } from './comerciantes/comerciantes.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ComerciantesModule, AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
