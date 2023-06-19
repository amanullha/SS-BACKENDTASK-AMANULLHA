import { IMedia, IMediaKey } from '@interfaces/media.interface';
import { DB_tables } from '@models/dbTable.enum';
import { Global, Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { CreateMediaDto } from './dto/createMediaDot';
import { Genre } from '@models/genre.enum';
import { MediaType } from '@models/mediaType.enum';
import { GlobalHelper } from '@helpers/global.helper';
import { StreamingPlatform } from '@models/streamingPlatform.enum';

@Injectable()
export class MediaService {
  constructor(
    @InjectModel(process.env.SERVER_TYPE + DB_tables.MEDIA)
    private mediaModel: Model<IMedia, IMediaKey>,
  ) {}
  async getMediaById(id: string): Promise<IMedia> {
    const media = await this.mediaModel.get({ id: id });
    return media;
  }

  async createMedia(createMediaDto: CreateMediaDto): Promise<IMedia> {
    const showObj = {
      id: GlobalHelper.getInstance().getUniqueId(),
      title: createMediaDto.title ?? '',
      imageUrl: createMediaDto.imageUrl ?? '',
      description: createMediaDto.description ?? '',
      releaseDate: createMediaDto.releaseDate ?? '',
      genre: createMediaDto.genre ?? Genre.ACTION,
      mediaType: createMediaDto.mediaType ?? MediaType.MOVIE,
      session: createMediaDto.session ?? 1,
      duration: createMediaDto.duration ?? 120,
      language: createMediaDto.language ?? 'English',
      actorIds: createMediaDto?.actorIds,
      directorIds: createMediaDto?.directorIds,
      producerIds: createMediaDto?.producerIds,
      writerIds: createMediaDto?.writerIds,
      crewIds: createMediaDto?.crewIds,
      awards: createMediaDto?.awards,
      trailerUrl: createMediaDto.trailerUrl ?? '',
      productionCompany: createMediaDto.productionCompany ?? '',
      country: createMediaDto.country ?? 'Bangladesh',
      streamingPlatform:
        createMediaDto.streamingPlatform ?? StreamingPlatform.YOUTUBE,
    };
    const show: IMedia = await this.mediaModel.create(showObj);
    return show;
  }
}
