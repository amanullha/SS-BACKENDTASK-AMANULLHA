import { GlobalHelper } from '@helpers/global.helper';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DynamooseModule } from 'nestjs-dynamoose';
import { UserSchema } from '@schemas/user.schema';
import { DB_tables } from '@models/dbTable.enum';
import * as dotenv from 'dotenv';

import { JwtStrategy } from 'shared/decorators/jwt.strategy';
import { FilmmakersSchema } from '@schemas/filmmakers.schema';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
dotenv.config();
@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: process.env.SERVER_TYPE + DB_tables.USER,
        schema: UserSchema,
      },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.REFRESH_TOKEN_VALIDITY },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [JwtStrategy, PassportModule, UserService],
})
export class UserModule {}
