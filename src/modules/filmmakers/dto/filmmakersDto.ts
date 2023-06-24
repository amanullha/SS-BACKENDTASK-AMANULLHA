import { IsNotEmpty, IsEnum } from 'class-validator';
import { ArtistType } from '@models/artistType.enum';

export class FilmmakersDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEnum(ArtistType, { message: 'Invalid_Role' })
  role: ArtistType;
}
