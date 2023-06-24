import { PassportModule } from '@nestjs/passport';
import { DB_tables } from '@models/dbTable.enum';
import { FilmmakersSchema } from '@schemas/filmmakers.schema';
import { DynamooseModule } from 'nestjs-dynamoose';
import { FilmmakersController } from './filmmakers.controller';
import { FilmmakersService } from './filmmakers.service';
import { UserSchema } from '@schemas/user.schema';
import { UserService } from '@modules/user/user.service';
import { JwtStrategy } from 'shared/decorators/jwt.strategy';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: process.env.SERVER_TYPE + DB_tables.USER,
        schema: UserSchema,
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
  controllers: [FilmmakersController],
  providers: [FilmmakersService, UserService, JwtStrategy],
})
export class FilmmakersModule {}
