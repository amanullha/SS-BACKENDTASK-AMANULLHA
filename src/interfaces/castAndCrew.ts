import { ArtistType } from "@models/artistType.enum";


export interface ICastAndCrewKey {
  id: string;
}
export interface ICastAndCrew extends ICastAndCrewKey {
  name: string;
  role: ArtistType;
  createdAt?: Date;
  updatedAt?: Date;
}
