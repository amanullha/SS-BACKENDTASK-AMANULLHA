import { IMedia, IMediaKey } from '@interfaces/media.interface';
import { DB_tables } from '@models/dbTable.enum';
import { Global, Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { CreateMediaDto as CreateShowDto } from './dto/createMediaDot';
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
  async getShowById(id: string): Promise<IMedia> {
    const media = await this.mediaModel.get({ id: id });
    return media;
  }

  async createShow(createShowDto: CreateShowDto): Promise<IMedia> {
    const showObj = this.constructShowCreateObject(createShowDto);
    const show: IMedia = await this.mediaModel.create(showObj);
    return show;
  }

  private constructShowCreateObject(createShowDto: CreateShowDto) {
    return {
      id: GlobalHelper.getInstance().getUniqueId(),
      title: createShowDto.title ?? '',
      imageUrl: createShowDto.imageUrl ?? '',
      description: createShowDto.description ?? '',
      releaseDate: createShowDto.releaseDate ?? '',
      genre: createShowDto.genre ?? Genre.ACTION,
      mediaType: createShowDto.mediaType ?? MediaType.MOVIE,
      episode: createShowDto.episode
        ? parseInt(String(createShowDto.episode))
        : 1,
      duration: createShowDto.duration ?? 120,
      language: createShowDto.language ?? 'English',
      actorIds: createShowDto?.actorIds,
      directorIds: createShowDto?.directorIds,
      producerIds: createShowDto?.producerIds,
      writerIds: createShowDto?.writerIds,
      crewIds: createShowDto?.crewIds,
      awards: createShowDto?.awards,
      trailerUrl: createShowDto.trailerUrl ?? '',
      productionCompany: createShowDto.productionCompany ?? '',
      country: createShowDto.country ?? 'Bangladesh',
      streamingPlatform:
        createShowDto.streamingPlatform ?? StreamingPlatform.YOUTUBE,
    };
  }
}
