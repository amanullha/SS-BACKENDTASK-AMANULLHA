import { UserType } from '@models/userType.enum';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUserDto';
import { UserLoginDto } from './dto/userLoginDto';
import { Roles } from 'shared/decorators/roles.decorators';
import { RoleGuard } from 'shared/guards/roles.guard';
import { IUser, JwtTokens } from '@interfaces/user.interface';
import { Request, Response } from 'express';
import { Controller, Post, Req, Res, Body, UseGuards, Get, Param } from '@nestjs/common';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create-admin')
  async createAdminUser(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() createUserDto: CreateUserDto,
  ): Promise<Partial<IUser>> {
    return await this.userService.createUser(
      req,
      res,
      createUserDto,
      UserType.ADMIN,
    );
  }
  @Post('/create')
  async createUser(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() createUserDto: CreateUserDto,
  ): Promise<Partial<IUser>> {
    return await this.userService.createUser(req, res, createUserDto);
  }
  @Post('/login')
  async userLogin(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() userLoginDto: UserLoginDto,
  ): Promise<Partial<IUser>> {
    const user = await this.userService.userLogin(userLoginDto, req, res);
    return user;
  }
  @UseGuards(RoleGuard)
  @Roles(UserType.ADMIN, UserType.SUPPER_ADMIN)
  @Get('')
  async getAllUser(): Promise<IUser[]> {
    return await this.userService.getAllUser();
  }

  @Get('/:userId')
  @UseGuards(RoleGuard)
  @Roles(UserType.ADMIN, UserType.SUPPER_ADMIN)
  async getOneUser(@Param('userId') userId: string): Promise<IUser> {
    return await this.userService.getOneUser(userId);
  }
}
