import { UserType } from '@models/userType.enum';
import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUserDto';
import { UserLoginDto } from './dto/userLoginDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create-admin')
  async createAdminUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto,UserType.ADMIN);
  }
  @Post('/create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }
  @Post('/login')
  async userLogin(@Body() userLoginDto: UserLoginDto) {
    return await this.userService.userLogin(userLoginDto);
  }

  @Get('')
  async getAllUser() {
    return await this.userService.getAllUser();
  }
  @Get('/:userId')
  async getOneUser(@Param('userId') userId: string) {
    return await this.userService.getOneUser(userId);
  }
}
