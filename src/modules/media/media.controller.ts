import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateShowDto } from './dto/createShowDot';
import { UpdateShowDto } from './dto/updateShowDto';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  async create(@Body() createMediaDto: CreateShowDto) {
    return await this.mediaService.createShow(createMediaDto);
  }
  @Put('/:showId')
  async update(
    @Param('showId') showId: string,
    @Body() updateShowDto: UpdateShowDto,
  ) {
    return await this.mediaService.updateShow(showId, updateShowDto);
  }

  @Get()
  async getShows(@Param('id') id: string) {
    return await this.mediaService.getShows();
  }
  @Get('/:id')
  async getShowById(@Param('id') id: string) {
    return await this.mediaService.getShowById(id);
  }
}
