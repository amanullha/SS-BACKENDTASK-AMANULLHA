import { UserType } from '@models/userType.enum';
import { Body, Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUserDto';
import { UserLoginDto } from './dto/userLoginDto';
import { Roles } from 'shared/decorators/roles.decorators';
import { RoleGuard } from 'shared/guards/roles.guard';
import { IUser, JwtTokens } from '@interfaces/user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create-admin')
  async createAdminUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ user: IUser; tokens: JwtTokens }> {
    return await this.userService.createUser(createUserDto, UserType.ADMIN);
  }
  @Post('/create')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ user: IUser; tokens: JwtTokens }> {
    return await this.userService.createUser(createUserDto);
  }
  @Post('/login')
  async userLogin(
    @Body() userLoginDto: UserLoginDto,
  ): Promise<{ user: IUser; tokens: JwtTokens }> {
    return await this.userService.userLogin(userLoginDto);
  }
  @UseGuards(RoleGuard)
  @Roles(UserType.ADMIN, UserType.SUPPER_ADMIN)
  @Get('')
  async getAllUser(): Promise<IUser[]> {
    return await this.userService.getAllUser();
  }
  @UseGuards(RoleGuard)
  @Roles(UserType.ADMIN, UserType.SUPPER_ADMIN)
  @Get('/:userId')
  async getOneUser(@Param('userId') userId: string): Promise<IUser> {
    return await this.userService.getOneUser(userId);
  }
}
