import { ArtistType } from '@models/artistType.enum';
import { Status } from '@models/status.enum';
import * as dynamoose from 'dynamoose';
export const castCrewSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    name: {
      type: String,
    },

    role: {
      type: String,
      enum: [
        ArtistType.ACTOR,
        ArtistType.CREW,
        ArtistType.DIRECTOR,
        ArtistType.PRODUCER,
        ArtistType.WRITER,
      ],
      default: ArtistType.ACTOR,
    },
  },
  {
    timestamps: true,
  },
);
