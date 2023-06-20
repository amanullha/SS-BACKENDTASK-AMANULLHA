import { Genre } from '@models/genre.enum';
import { MediaType } from '@models/mediaType.enum';
import { StreamingPlatform } from '@models/streamingPlatform.enum';

export interface IMediaKey {
  id: string;
}
export interface IMedia {
  title: string;
  imageUrl: string;
  description?: string;
  releaseDate?: string;
  genre?: Genre;
  mediaType?: MediaType;
  duration?: number;
  rating?: string;
  language?: string;
  filmmakerIds?: string[];
  awards?: string[];
  trailerUrl?: string;
  productionCompany?: string;
  country?: string;
  streamingPlatform?: StreamingPlatform;
  episode?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
