import { Test, TestingModule } from '@nestjs/testing';
import { ComerciantesController } from './comerciantes.controller';
import { ComerciantesService } from './comerciantes.service';

describe('ComerciantesController', () => {
  let controller: ComerciantesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComerciantesController],
      providers: [ComerciantesService],
    }).compile();

    controller = module.get<ComerciantesController>(ComerciantesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
