import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/createMediaDot';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  async createMedia(@Body() createMediaDto: CreateMediaDto) {
    return await this.mediaService.createMedia(createMediaDto);
  }

  @Get('/:id')
  async getMediaById(@Param('id') id: string) {
    return await this.mediaService.getMediaById(id);
  }
}
