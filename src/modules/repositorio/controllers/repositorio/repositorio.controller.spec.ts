import { Test, TestingModule } from '@nestjs/testing';
import { RepositorioController } from './repositorio.controller';

describe('RepositorioController', () => {
  let controller: RepositorioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepositorioController],
    }).compile();

    controller = module.get<RepositorioController>(RepositorioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
