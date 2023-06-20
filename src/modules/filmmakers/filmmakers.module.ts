import { Module } from '@nestjs/common';
import { CastAndCrewController } from './filmmakers.controller';
import { CastAndCrewService } from './filmmakers.service';

@Module({
  controllers: [CastAndCrewController],
  providers: [CastAndCrewService],
})
export class CastAndCrewModule {}
