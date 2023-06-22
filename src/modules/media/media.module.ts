import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { DB_tables } from '@models/dbTable.enum';
import { MediaSchema } from '@schemas/media.schema';
import { DynamooseModule } from 'nestjs-dynamoose';
import { FilmmakersSchema } from '@schemas/filmmakers.schema';
import { FilmmakersService } from '@modules/filmmakers/filmmakers.service';
import { JwtStrategy } from 'shared/decorators/jwt.strategy';
import { UserService } from '@modules/user/user.service';
import { UserSchema } from '@schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: process.env.SERVER_TYPE + DB_tables.USER,
        schema: UserSchema,
      },
      {
        name: process.env.SERVER_TYPE + DB_tables.MEDIA,
        schema: MediaSchema,
      },
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
  controllers: [MediaController],
  providers: [MediaService, FilmmakersService,UserService],
})
export class MediaModule {}
