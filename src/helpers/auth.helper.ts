import { IUser, IUserKey, JwtTokens } from '@interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  ONE_DAY_IN_MILL_SECONDS,
  TEN_MINS_IN_MILL_SECONDS,
} from './globalConstants';
import * as dotenv from 'dotenv';
import { LoginRequestType, UserLoginDto } from '@modules/user/dto/userLoginDto';
import { Model } from 'nestjs-dynamoose';
import { GlobalHelper } from './global.helper';
import { Request, Response } from 'express';
dotenv.config();

export class AuthHelper {
  private static instance: AuthHelper;
  static getInstance(): AuthHelper {
    AuthHelper.instance = AuthHelper.instance || new AuthHelper();
    return AuthHelper.instance;
  }
  async generateHash(value: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(value, salt);
    return hash;
  }
  async compareHash(value: string, hash: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(value, hash);
    return isMatch;
  }
  async generateTokens(
    req: Request,
    res: Response,
    user: Partial<IUser>,
    jwt: JwtService,
  ) {
    const accessToken = await this.generateAccessToken(user, jwt);
    // const refreshToken = await this.generateRefreshToken(user, jwt);
    const cookieOption = {
      httpOnly: true,
      secure: false,
      maxAge: ONE_DAY_IN_MILL_SECONDS,
    };
    res.cookie('accessToken', accessToken, cookieOption);
    // res.cookie('refreshToken', refreshToken, cookieOption);
  }

  async generateAccessToken(
    user: Partial<IUser>,
    jwt: JwtService,
  ): Promise<string> {
    let body = {
      email: user.email,
      id: user.id,
      userType: user.userType,
    };
    const accessToken = await this.generateToken(
      body,
      jwt,
      TEN_MINS_IN_MILL_SECONDS,
    );
    return accessToken;
  }
  async generateRefreshToken(user: Partial<IUser>, jwt: JwtService) {
    let body = {
      email: user.email,
      id: user.id,
      userType: user.userType,
    };
    const refreshToken = await this.generateToken(
      body,
      jwt,
      process.env.ACCESS_TOKEN_VALIDITY,
    );
    return refreshToken;
  }

  async generateToken(
    body: any,
    jwt: JwtService,
    expireTime: any,
  ): Promise<string> {
    const token = jwt.sign({ user: body }, { expiresIn: expireTime });
    return token;
  }
  async verify(
    userLoginDto: UserLoginDto,
    userModel: Model<IUser, IUserKey>,
    jwt: JwtService,
  ): Promise<IUser> {
    let user: IUser = null;

    const users: IUser[] = await userModel
      .scan('email')
      .eq(userLoginDto.email)
      .exec();
    user = GlobalHelper.getInstance().arrayFirstOrNull(users);

    return user;
  }
}
