import { Status } from '@models/status.enum';
import { UserType } from '@models/userType.enum';

export interface IUserKey {
  id: string;
}
export interface IUser extends IUserKey {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  userType?: UserType;
  image?: string;
  verificationCode?: string;
  isVerified?: boolean;
  status?: Status;
  createdAt?: Date;
  updatedAt?: Date;
}

export class JwtTokens {
  accessToken?: string;
  refreshToken?: string;
}
