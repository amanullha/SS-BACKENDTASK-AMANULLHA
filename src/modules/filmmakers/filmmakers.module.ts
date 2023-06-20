import { Module } from '@nestjs/common';
import { CastAndCrewController } from './filmmakers.controller';
import { CastAndCrewService } from './filmmakers.service';
import { DB_tables } from '@models/dbTable.enum';
import { FilmmakersSchema } from '@schemas/filmmakers.schema';
import { DynamooseModule } from 'nestjs-dynamoose';

@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: process.env.SERVER_TYPE + DB_tables.FILMMAKERS,
        schema: FilmmakersSchema,
      },
    ]),
  ],
  controllers: [CastAndCrewController],
  providers: [CastAndCrewService],
})
export class CastAndCrewModule {}
