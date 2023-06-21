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
dotenv.config();

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private jwt: JwtService, private reflector: Reflector) {}
  canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();

    const token = request?.headers?.authorization?.split(' ')[1];
    const secretKey = String(process.env.JWT_SECRET);

    try {
      const decodedToken = this.jwt.verify(token, {
        secret: secretKey,
      });
      const user = decodedToken['user'];
      if (GlobalHelper.getInstance().isEmpty(user)) {
        throw new ForbiddenException();
      }
      return roles.includes(user['userType']);
    } catch (error) {
      throw new UnauthorizedException();
    }
    return false;
  }
}
