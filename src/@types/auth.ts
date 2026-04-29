import type { Types } from "mongoose";

export interface SessionType {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  accessToken: string;
  refreshToken: string;
  accessTokenValidUntil: Date;
  refreshTokenValidUntil: Date;
}

export interface UserType {
  _id: Types.ObjectId;
  username: string;
  email: string;
}
