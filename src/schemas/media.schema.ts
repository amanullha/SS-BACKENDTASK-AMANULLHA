import { StreamingPlatform } from './../models/streamingPlatform.enum';
import { Status } from '@models/status.enum';
import * as dynamoose from 'dynamoose';
import { Genre } from '@models/genre.enum';
import { MediaType } from '@models/mediaType.enum';

export const MediaSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    releaseDate: {
      type: String,
    },
    genre: {
      type: String,
      enum: [Genre.ACTION, Genre.COMEDY, Genre.DRAMA, Genre.OTHER],
      default: Genre.DRAMA,
    },
    mediaType: {
      type: String,
      enum: [MediaType.MOVIE, MediaType.TV_SHOW],
      default: MediaType.MOVIE,
    },
    episode: {
      type: Number,
    },
    duration: {
      type: Number,
    },
    rating: {
      type: String,
    },
    language: {
      type: String,
    },
    filmmakerIds: {
      type: Array,
      schema: [
        {
          type: String,
        },
      ],
      default: [],
    },
    awards: {
      type: Array,
      schema: [
        {
          type: String,
        },
      ],
      default: [],
    },
    imageUrl: {
      type: String,
    },
    trailerUrl: {
      type: String,
    },
    productionCompany: {
      type: String,
    },
    country: {
      type: String,
    },
    streamingPlatform: {
      type: String,
      enum: [
        StreamingPlatform.AMAZON_PRIME,
        StreamingPlatform.NETFLIX,
        StreamingPlatform.DISNEY_PLUS,
        StreamingPlatform.HBO_MAX,
        StreamingPlatform.SPOTIFY,
        StreamingPlatform.YOUTUBE,
        StreamingPlatform.OTHER,
      ],
      default: StreamingPlatform.NETFLIX,
    },
  },
  {
    timestamps: true,
  },
);
