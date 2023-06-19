import { Module } from '@nestjs/common';
import { CastAndCrewController } from './cast-and-crew.controller';
import { CastAndCrewService } from './cast-and-crew.service';

@Module({
  controllers: [CastAndCrewController],
  providers: [CastAndCrewService]
})
export class CastAndCrewModule {}
