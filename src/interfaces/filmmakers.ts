import { ArtistType } from "@models/artistType.enum";


export interface IFilmmakersKey {
  id: string;
}
export interface IFilmmakers extends IFilmmakersKey {
  name: string;
  role: ArtistType;
  createdAt?: Date;
  updatedAt?: Date;
}
