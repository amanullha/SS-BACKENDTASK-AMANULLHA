import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { FilmmakersDto } from './dto/filmmakersDto';
import { FilmmakersService } from './filmmakers.service';
import { IFilmmakers } from '@interfaces/filmmakers';
import { UserType } from '@models/userType.enum';
import { Roles } from 'shared/decorators/roles.decorators';
import { RoleGuard } from 'shared/guards/roles.guard';

@Controller('filmmakers')
export class FilmmakersController {
  constructor(private readonly filmmakersService: FilmmakersService) {}

  @UseGuards(RoleGuard)
  @Roles(UserType.ADMIN, UserType.SUPPER_ADMIN)
  @Post()
  async create(@Body() filmmakerDto: FilmmakersDto): Promise<IFilmmakers> {
    return await this.filmmakersService.create(filmmakerDto);
  }
  @UseGuards(RoleGuard)
  @Roles(UserType.ADMIN, UserType.SUPPER_ADMIN)
  @Get('/:filmmakerId')
  async getOne(
    @Param('filmmakerId') filmmakerId: string,
  ): Promise<IFilmmakers> {
    return await this.filmmakersService.getOne(filmmakerId);
  }
}
