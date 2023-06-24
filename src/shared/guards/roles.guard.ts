import { UserService } from '@modules/user/user.service';
import { GlobalHelper } from '@helpers/global.helper';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { Reflector } from '@nestjs/core';
import { IUser } from '@interfaces/user.interface';
dotenv.config();

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private jwt: JwtService,
    private reflector: Reflector,
    private userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();

    // const token = request?.headers?.authorization?.split(' ')[1];
    const token = request?.cookies?.accessToken;
    const secretKey = String(process.env.JWT_SECRET);

    try {
      const decodedToken = this.jwt.verify(token, {
        secret: secretKey,
      });
      const payloadUser = decodedToken['user'];
      if (GlobalHelper.getInstance().isEmpty(payloadUser)) {
        throw new ForbiddenException();
      }
      const user: IUser = await this.userService.getOneUser(payloadUser['id']);
      if (GlobalHelper.getInstance().isEmpty(user)) {
        throw new ForbiddenException();
      }
      return roles.includes(user.userType);
    } catch (error) {
      throw new UnauthorizedException();
    }
    return false;
  }
}
