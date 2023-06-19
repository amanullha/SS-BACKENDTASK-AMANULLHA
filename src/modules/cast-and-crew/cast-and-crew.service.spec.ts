import { Test, TestingModule } from '@nestjs/testing';
import { CastAndCrewService } from './cast-and-crew.service';

describe('CastAndCrewService', () => {
  let service: CastAndCrewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CastAndCrewService],
    }).compile();

    service = module.get<CastAndCrewService>(CastAndCrewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
