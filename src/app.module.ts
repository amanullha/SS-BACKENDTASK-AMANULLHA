import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DynamooseModule, DynamooseModuleOptions } from 'nestjs-dynamoose';
import { UserModule } from './modules/user/user.module';
import { MediaModule } from './modules/media/media.module';
import * as dotenv from 'dotenv';
import { FilmmakersModule } from '@modules/filmmakers/filmmakers.module';
dotenv.config();

// const dynamodbConfig: DynamooseModuleOptions = {
//   aws: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: process.env.AWS_REGION,
//   },
//   local: process.env.AWS_IS_DB_LOCAL == 'true',
// };
const dynamodbConfig: DynamooseModuleOptions = {
  aws: {
    region: process.env.AWS_REGION,
  },
  local: process.env.AWS_IS_DB_LOCAL == 'true',
};

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DynamooseModule.forRoot(dynamodbConfig),
    UserModule,
    MediaModule,
    FilmmakersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
