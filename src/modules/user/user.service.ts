import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { IUser, IUserKey, JwtTokens } from '@interfaces/user.interface';
import { GlobalHelper } from '@helpers/global.helper';
import { UserType } from '@models/userType.enum';
import { Status } from '@models/status.enum';
import { ExceptionHelper } from '@helpers/exception.helper';
import { AuthHelper } from '@helpers/auth.helper';
import * as dotenv from 'dotenv';
import { JwtService } from '@nestjs/jwt';
import { LoginRequestType, UserLoginDto } from './dto/userLoginDto';
import { DB_tables } from '@models/dbTable.enum';
import { Request, Response } from 'express';
import { ONE_DAY_IN_MILL_SECONDS } from '@helpers/globalConstants';
dotenv.config();
@Injectable()
export class UserService {
  constructor(
    @InjectModel(process.env.SERVER_TYPE + DB_tables.USER)
    private userModel: Model<IUser, IUserKey>,
    private jwtService: JwtService,
  ) {}

  async createUser(
    req: Request,
    res: Response,
    createUserDto: CreateUserDto,
    userType?: UserType,
  ): Promise<Partial<IUser>> {
    const existUser = await this.getUserByEmail(createUserDto.email);
    if (!GlobalHelper.getInstance().isEmpty(existUser)) {
      ExceptionHelper.getInstance().throwDuplicateException(
        'User_exist_with_this_email',
      );
    }

    const createUserObj = await this.constructCreateUserObj(
      createUserDto,
      userType,
    );
    let createdUser: IUser = await this.userModel.create(createUserObj);

    const user = await this.constructReturnUserObj(createdUser);
    await AuthHelper.getInstance().generateTokens(req,res,createdUser, this.jwtService);
    return user;
  }
  async getUserByEmail(email: string): Promise<IUser> {
    if (!GlobalHelper.getInstance().isEmpty(email)) {
      const users: IUser[] = await this.userModel
        .scan()
        .where('email')
        .eq(email)
        .exec();
      return GlobalHelper.getInstance().arrayFirstOrNull(users);
    }
  }

  private async constructCreateUserObj(
    createUserDto: CreateUserDto,
    userType?: UserType,
  ): Promise<IUser> {
    const hashPassword = await AuthHelper.getInstance().generateHash(
      createUserDto.password,
    );
    const obj = {
      id: GlobalHelper.getInstance().getUniqueId(),
      name: createUserDto.name ?? '',
      email: createUserDto.email ?? '',
      phone: createUserDto.phone ?? '',
      password: hashPassword ?? '',
      image: createUserDto.image ?? '',
      userType: userType ?? UserType.CUSTOMER,
      verificationCode: '',
      isVerified: false,
      status: Status.ACTIVE,
    };

    return obj;
  }

  async constructReturnUserObj(
    createdUser: IUser,
  ): Promise< Partial<IUser>> {
    const userObj = {
      id: createdUser?.id,
      name: createdUser?.name,
      email: createdUser?.email,
      image: createdUser?.image,
      status: createdUser?.status,
    };
    return userObj;
  }

  async getAllUser(): Promise<IUser[]> {
    const users: IUser[] = await this.userModel.scan().exec();
    return users;
  }
  async getOneUser(userId: string): Promise<IUser> {
    if (!GlobalHelper.getInstance().isEmpty(userId)) {
      const user: IUser = await this.userModel.get({ id: userId });
      return user;
    } else {
      ExceptionHelper.getInstance().defaultError(
        'Invalid userId',
        'Invalid_UserId',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async findByEmail(email: string): Promise<IUser> {
    if (GlobalHelper.getInstance().isEmpty(email)) {
      ExceptionHelper.getInstance().throwUserNotFoundException();
    }

    const users = await this.userModel.scan().where('email').eq(email).exec();

    return GlobalHelper.getInstance().arrayFirstOrNull(users);
  }

  async userLogin(
    userLoginDto: UserLoginDto,
    req: Request,
    res: Response,
  ): Promise<Partial<IUser>> {
    const user: IUser = await AuthHelper.getInstance().verify(
      userLoginDto,
      this.userModel,
      this.jwtService,
    );

    if (GlobalHelper.getInstance().isEmpty(user)) {
      ExceptionHelper.getInstance().defaultError(
        'Invalid user',
        'Invalid_User',
        HttpStatus.BAD_REQUEST,
      );
    }
    let isPasswordMatch = await AuthHelper.getInstance().compareHash(
      userLoginDto.password,
      user?.password,
    );
    if (!isPasswordMatch) {
      ExceptionHelper.getInstance().defaultError(
        'Invalid password',
        'Invalid_password',
        HttpStatus.BAD_REQUEST,
      );
    }
    const loginUser = await this.constructReturnUserObj(user);
    await AuthHelper.getInstance().generateTokens(
      req,
      res,
      loginUser,
      this.jwtService,
    );
    return loginUser;
  }

  async setTokenToCookie(
    tokens: JwtTokens,
    req: Request,
    res: Response,
  ): Promise<void> {
    const cookieOption = {
      httpOnly: true,
      secure: false,
      maxAge: ONE_DAY_IN_MILL_SECONDS,
    };
    res.cookie('accessToken', tokens.accessToken, cookieOption);
    res.cookie('refreshToken', tokens.refreshToken, cookieOption);
  }
}
