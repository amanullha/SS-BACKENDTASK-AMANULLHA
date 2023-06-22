import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateShowDto } from './dto/createShowDot';
import { UpdateShowDto } from './dto/updateShowDto';
import { RoleGuard } from 'shared/guards/roles.guard';
import { Roles } from 'shared/decorators/roles.decorators';
import { UserType } from '@models/userType.enum';
import { IMedia } from '@interfaces/media.interface';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  // @UseGuards(AuthGuard('jwt'))

  @Post()
  @UseGuards(RoleGuard)
  @Roles(UserType.ADMIN, UserType.SUPPER_ADMIN)
  async create(@Body() createMediaDto: CreateShowDto): Promise<IMedia> {
    return await this.mediaService.createShow(createMediaDto);
  }

  @Put('/:showId')
  @UseGuards(RoleGuard)
  @Roles(UserType.ADMIN, UserType.SUPPER_ADMIN)
  async update(
    @Param('showId') showId: string,
    @Body() updateShowDto: UpdateShowDto,
  ): Promise<IMedia> {
    return await this.mediaService.updateShow(showId, updateShowDto);
  }

  @Get()
  async getShows(@Param('id') id: string): Promise<IMedia[]> {
    return await this.mediaService.getShows();
  }
  @Get('/:id')
  async getShowById(@Param('id') id: string): Promise<IMedia> {
    return await this.mediaService.getShowById(id);
  }
}
