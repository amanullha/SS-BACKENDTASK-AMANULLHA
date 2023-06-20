import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FilmmakersDto } from './dto/filmmakersDto';
import { FilmmakersService } from './filmmakers.service';
import { IFilmmakers } from '@interfaces/filmmakers';

@Controller('filmmakers')
export class FilmmakersController {
  constructor(private readonly filmmakersService: FilmmakersService) {}

  @Post()
  async create(@Body() filmmakerDto: FilmmakersDto): Promise<IFilmmakers> {
    return await this.filmmakersService.create(filmmakerDto);
  }
  @Get('/:filmmakerId')
  async getOne(
    @Param('filmmakerId') filmmakerId: string,
  ): Promise<IFilmmakers> {
    return await this.filmmakersService.getOne(filmmakerId);
  }
}
