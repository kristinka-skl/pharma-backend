import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import type { Request, Response, NextFunction } from 'express';


export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(createHttpError(401, 'Invalid credentials'));
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return next(createHttpError(401, 'Invalid credentials'));
  }
  // await Session.deleteOne({ userId: user._id });
  // const newSession = await createSession(user._id);
  // setSessionCookies(res, newSession);
  res.status(200).json(user);
};
