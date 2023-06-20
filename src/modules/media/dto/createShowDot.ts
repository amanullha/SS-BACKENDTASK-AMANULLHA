import { Genre } from '@models/genre.enum';
import { MediaType } from '@models/mediaType.enum';
import { StreamingPlatform } from '@models/streamingPlatform.enum';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  ValidateIf,
} from 'class-validator';

export class CreateShowDto {
  @IsNotEmpty({ message: 'title_empty' })
  title: string;
  @IsNotEmpty({ message: 'image_empty' })
  imageUrl: string;
  @IsNotEmpty({ message: 'mediaType_empty' })
  @IsEnum(MediaType, { message: 'Invalid mediaType' })
  mediaType: MediaType;
  @ValidateIf((obj) => obj.mediaType === MediaType.TV_SHOW)
  @IsNotEmpty({ message: 'episode_empty' })
  @Transform(({ value }) => parseInt(value))
  @IsPositive({ message: 'episode_must_be_greater_than_1' })
  episode: number;

  @IsOptional()
  description: string;
  @IsOptional()
  releaseDate: string;
  @IsOptional()
  genre: Genre;
  @IsOptional()
  duration: number;
  @IsOptional()
  rating: string;
  @IsOptional()
  language: string;
  @IsOptional()
  filmmakerIds: string[];
  @IsOptional()
  awards: string[];
  @IsOptional()
  trailerUrl: string;
  @IsOptional()
  productionCompany: string;
  @IsOptional()
  country: string;
  @IsOptional()
  streamingPlatform: StreamingPlatform;
}
