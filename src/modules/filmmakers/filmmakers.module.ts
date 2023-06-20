import { Module } from '@nestjs/common';
import { DB_tables } from '@models/dbTable.enum';
import { FilmmakersSchema } from '@schemas/filmmakers.schema';
import { DynamooseModule } from 'nestjs-dynamoose';
import { FilmmakersController } from './filmmakers.controller';
import { FilmmakersService } from './filmmakers.service';

@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: process.env.SERVER_TYPE + DB_tables.FILMMAKERS,
        schema: FilmmakersSchema,
      },
    ]),
  ],
  controllers: [FilmmakersController],
  providers: [FilmmakersService],
})
export class FilmmakersModule {}
