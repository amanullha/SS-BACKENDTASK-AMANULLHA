import { IMedia, IMediaKey } from '@interfaces/media.interface';
import { DB_tables } from '@models/dbTable.enum';
import { Global, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { Genre } from '@models/genre.enum';
import { MediaType } from '@models/mediaType.enum';
import { GlobalHelper } from '@helpers/global.helper';
import { StreamingPlatform } from '@models/streamingPlatform.enum';
import { FilmmakersService } from '@modules/filmmakers/filmmakers.service';

import { ExceptionHelper } from '@helpers/exception.helper';
import { UpdateShowDto } from './dto/updateShowDto';
import { CreateShowDto } from './dto/createShowDot';

@Injectable()
export class MediaService {
  constructor(
    @InjectModel(process.env.SERVER_TYPE + DB_tables.MEDIA)
    private mediaModel: Model<IMedia, IMediaKey>,
    private readonly filmmakersService: FilmmakersService,
  ) {}
  async getShowById(showId: string): Promise<IMedia> {
    if (GlobalHelper.getInstance().isEmpty(showId)) {
      ExceptionHelper.getInstance().defaultError(
        'invalid id',
        'invalid_Id',
        HttpStatus.BAD_REQUEST,
      );
    }

    const show = await this.mediaModel.get({ id: showId });
    const filmmakers = await this.populateFilmmakers(show?.filmmakerIds);
    show['filmmakers'] = filmmakers;
    return show;
  }
  async getShows(): Promise<IMedia[]> {
    const shows = await this.mediaModel.scan().exec();
    if (!GlobalHelper.getInstance().isEmpty(shows)) {
      for (let i = 0; i < shows?.length; i++) {
          const filmmakers = await this.populateFilmmakers(
            shows[i]?.filmmakerIds,
          );
        shows[i]['filmmakers'] = filmmakers;
      }
    }
    return shows;
  }

  private async populateFilmmakers(filmmakerIds: string[]) {
    let filmmakers = [];
    if (!GlobalHelper.getInstance().isEmpty(filmmakerIds)) {
      for (let i = 0; i < filmmakerIds?.length; i++) {
        const filmmaker = await this.filmmakersService.getOne(filmmakerIds[i]);
        if (!GlobalHelper.getInstance().isEmpty(filmmaker)) {
          filmmakers.push(filmmaker);
        }
      }
    }
    return filmmakers;
  }

  async createShow(createShowDto: CreateShowDto): Promise<IMedia> {
    const showObj = await this.constructShowCreateObject(createShowDto);
    const show: IMedia = await this.mediaModel.create(showObj);
    return show;
  }
  async updateShow(
    showId: string,
    updateShowDto: UpdateShowDto,
  ): Promise<IMedia> {
    const show = await this.getOne(showId);
    if (GlobalHelper.getInstance().isEmpty(show)) {
      ExceptionHelper.getInstance().defaultError(
        'invalid id',
        'invalid_Id',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.checkFilmmakers(updateShowDto);
    const updateShowObj = await this.constructShowUpdateObject(
      updateShowDto,
      show,
    );
    const updateShow: IMedia = await this.mediaModel.update(
      { id: showId },
      updateShowObj,
    );
    return updateShow;
  }

  async checkFilmmakers(showDto: UpdateShowDto) {
    if (!GlobalHelper.getInstance().isEmpty(showDto.filmmakerIds)) {
      for (let i = 0; i < showDto?.filmmakerIds?.length; i++) {
        const filmmaker = await this.filmmakersService.getOne(
          showDto?.filmmakerIds[i],
        );
        if (GlobalHelper.getInstance().isEmpty(filmmaker)) {
          ExceptionHelper.getInstance().defaultError(
            'invalid filmmaker id',
            'invalid_filmmaker_id',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
    }
  }

  async getOne(showId: string): Promise<IMedia> {
    if (GlobalHelper.getInstance().isEmpty(showId)) {
      ExceptionHelper.getInstance().defaultError(
        'invalid id',
        'invalid_Id',
        HttpStatus.BAD_REQUEST,
      );
    }
    const show = await this.mediaModel.get({ id: showId });
    return show;
  }

  async constructShowCreateObject(createShowDto: CreateShowDto) {
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
      filmmakerIds: createShowDto?.filmmakerIds,
      awards: createShowDto?.awards,
      trailerUrl: createShowDto.trailerUrl ?? '',
      productionCompany: createShowDto.productionCompany ?? '',
      country: createShowDto.country ?? 'Bangladesh',
      streamingPlatform:
        createShowDto.streamingPlatform ?? StreamingPlatform.YOUTUBE,
    };
  }
  async constructShowUpdateObject(updateShowDto: UpdateShowDto, show: IMedia) {
    const obj = {
      imageUrl: updateShowDto.imageUrl ?? show.imageUrl,
      description: updateShowDto.description ?? show.description,
      releaseDate: updateShowDto.releaseDate ?? show.releaseDate,
      genre: updateShowDto.genre ?? show.genre,
      duration: updateShowDto.duration ?? show.duration,
      language: updateShowDto.language ?? show.language,
      trailerUrl: updateShowDto.trailerUrl ?? show.trailerUrl,
      productionCompany:
        updateShowDto.productionCompany ?? show.productionCompany,
      country: updateShowDto.country ?? show.country,
      streamingPlatform:
        updateShowDto.streamingPlatform ?? show.streamingPlatform,
    };
    if (!GlobalHelper.getInstance().isEmpty(updateShowDto.awards)) {
      obj['awards'] = [...updateShowDto?.awards];
      if (!GlobalHelper.getInstance().isEmpty(show.awards)) {
        obj['awards'] = [
          ...new Set([...show.awards, ...updateShowDto?.awards]),
        ];
      }
    }
    if (!GlobalHelper.getInstance().isEmpty(updateShowDto.filmmakerIds)) {
      obj['filmmakerIds'] = [...updateShowDto?.filmmakerIds];
      if (!GlobalHelper.getInstance().isEmpty(show.filmmakerIds)) {
        obj['filmmakerIds'] = [
          ...new Set([...show.filmmakerIds, ...updateShowDto?.filmmakerIds]),
        ];
      }
    }
    if (
      updateShowDto.episode != show.episode &&
      show.mediaType == MediaType.TV_SHOW
    ) {
      obj['episode'] = updateShowDto.episode ?? show.episode;
    }

    return obj;
  }
}
