import { Genre } from '@models/genre.enum';
import { MediaType } from '@models/mediaType.enum';
import { StreamingPlatform } from '@models/streamingPlatform.enum';
import { IsNotEmpty, IsOptional } from 'class-validator';


export class CreateMediaDto {
  @IsNotEmpty({ message: 'title_empty' })
  title: string;
  @IsNotEmpty({ message: 'image_empty' })
  imageUrl: string;

  @IsOptional()
  description: string;
  @IsOptional()
  releaseDate: string;
  @IsOptional()
  genre: Genre;
  @IsOptional()
  mediaType: MediaType;
  @IsOptional()
  duration: number;
  @IsOptional()
  rating: string;
  @IsOptional()
  language: string;
  @IsOptional()
  actorIds: string[];
  @IsOptional()
  directorIds: string[];
  @IsOptional()
  producerIds: string[];
  @IsOptional()
  writerIds: string[];
  @IsOptional()
  crewIds: string[];
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
  @IsOptional()
  session: number;
}
