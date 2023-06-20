import { Test, TestingModule } from '@nestjs/testing';
import { CastAndCrewController } from './filmmakers.controller';

describe('CastAndCrewController', () => {
  let controller: CastAndCrewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CastAndCrewController],
    }).compile();

    controller = module.get<CastAndCrewController>(CastAndCrewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
