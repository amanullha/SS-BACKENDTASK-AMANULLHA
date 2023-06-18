import { Status } from '@models/status.enum';
import { UserType } from '@models/userType.enum';
import * as dynamoose from 'dynamoose';

export const UserSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
    },
    salt: {
      type: String,
    },
    verificationCode: {
      type: String,
    },
    isVerified: {
      type: Boolean,
    },
    status: {
      type: String,
      enum: [Status.ACTIVE, Status.IN_ACTIVE],
      default: Status.ACTIVE,
    },
    image: {
      type: String,
    },
    userType: {
      type: String,
      enum: [
        UserType.ADMIN,
        UserType.CUSTOMER,
        UserType.GUEST,
        UserType.SUPPER_ADMIN,
      ],
      default: UserType.CUSTOMER,
    },
  },
  {
    timestamps: true,
  },
);
