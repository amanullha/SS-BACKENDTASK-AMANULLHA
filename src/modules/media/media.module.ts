import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { DB_tables } from '@models/dbTable.enum';
import { MediaSchema } from '@schemas/media.schema';
import { DynamooseModule } from 'nestjs-dynamoose';
import { FilmmakersSchema } from '@schemas/filmmakers.schema';

@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: process.env.SERVER_TYPE + DB_tables.MEDIA,
        schema: MediaSchema,
      },
    ]),
  ],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
