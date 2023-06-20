import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { DB_tables } from '@models/dbTable.enum';
import { MediaSchema } from '@schemas/media.schema';
import { DynamooseModule } from 'nestjs-dynamoose';
import { FilmmakersSchema } from '@schemas/filmmakers.schema';
import { FilmmakersService } from '@modules/filmmakers/filmmakers.service';

@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: process.env.SERVER_TYPE + DB_tables.MEDIA,
        schema: MediaSchema,
      },
      {
        name: process.env.SERVER_TYPE + DB_tables.FILMMAKERS,
        schema: FilmmakersSchema,
      },
    ]),
  ],
  controllers: [MediaController],
  providers: [MediaService,FilmmakersService],
})
export class MediaModule {}
