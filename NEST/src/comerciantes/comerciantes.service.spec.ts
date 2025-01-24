import { Test, TestingModule } from '@nestjs/testing';
import { ComerciantesService } from './comerciantes.service';

describe('ComerciantesService', () => {
  let service: ComerciantesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComerciantesService],
    }).compile();

    service = module.get<ComerciantesService>(ComerciantesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
