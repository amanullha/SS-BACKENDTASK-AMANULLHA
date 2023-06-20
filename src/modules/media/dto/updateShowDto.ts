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

export class UpdateShowDto {
  @IsOptional()
  imageUrl: string;
  @IsOptional()
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
