import { IFilmmakers, IFilmmakersKey } from '@interfaces/filmmakers';
import { DB_tables } from '@models/dbTable.enum';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { FilmmakersDto } from './dto/filmmakersDto';
import { GlobalHelper } from '@helpers/global.helper';
import { ArtistType } from '@models/artistType.enum';
import { ExceptionHelper } from '@helpers/exception.helper';
import { IUser, IUserKey } from '@interfaces/user.interface';

@Injectable()
export class FilmmakersService {
  constructor(
    @InjectModel(process.env.SERVER_TYPE + DB_tables.FILMMAKERS)
    private filmmakersModel: Model<IFilmmakers, IFilmmakersKey>,
  ) {}

  async create(filmmakersDto: FilmmakersDto): Promise<IFilmmakers> {
    const filmmakerObj = {
      id: GlobalHelper.getInstance().getUniqueId(),
      name: filmmakersDto.name ?? '',
      role: filmmakersDto.role ?? ArtistType.ACTOR,
    };
    const filmmaker = await this.filmmakersModel.create(filmmakerObj);
    return filmmaker;
  }
  async getOne(filmmakerId: string): Promise<IFilmmakers> {
    if (GlobalHelper.getInstance().isEmpty(filmmakerId)) {
      ExceptionHelper.getInstance().defaultError(
        'invalid id',
        'invalid_Id',
        HttpStatus.BAD_REQUEST,
      );
    }
    const filmmaker = await this.filmmakersModel.get({ id: filmmakerId });
    return filmmaker;
  }
}
