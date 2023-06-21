import { Module } from '@nestjs/common';
import { DB_tables } from '@models/dbTable.enum';
import { FilmmakersSchema } from '@schemas/filmmakers.schema';
import { DynamooseModule } from 'nestjs-dynamoose';
import { FilmmakersController } from './filmmakers.controller';
import { FilmmakersService } from './filmmakers.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: process.env.SERVER_TYPE + DB_tables.FILMMAKERS,
        schema: FilmmakersSchema,
      },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.REFRESH_TOKEN_VALIDITY },
    }),
  ],
  controllers: [FilmmakersController],
  providers: [FilmmakersService],
})
export class FilmmakersModule {}
