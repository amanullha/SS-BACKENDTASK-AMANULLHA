import { UserService } from '@modules/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv';
import { Request } from 'express';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWTFromCookie,
      ]),
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  private static extractJWTFromCookie(req: Request): string | null {
    if (req.cookies && req.cookies.accessToken) {
      return req.cookies.accessToken;
    }
    return null;
  }
  async validate(payload): Promise<any> {
    const userEmail = payload['user']['email'];
    console.log('email: ', userEmail);
    const user = await this.userService.findByEmail(userEmail);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
