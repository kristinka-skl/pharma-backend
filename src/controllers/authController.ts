import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import type { Request, Response, NextFunction } from 'express';
import { createSession, setSessionCookies } from '../services/auth.js';
import { Session } from '../models/session.js';

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(createHttpError(401, 'Invalid credentials'));
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return next(createHttpError(401, 'Invalid credentials'));
  }
  await Session.deleteOne({ userId: user._id });
  const newSession = await createSession(user._id);
  setSessionCookies(res, newSession);
  res.status(200).json(user);
};

export const refreshUserSession = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const session = await Session.findOne({
    _id: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });
  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }
  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);
  if (isSessionTokenExpired) {
    return next(createHttpError(401, 'Session token expired'));
  }
  await Session.deleteOne({
    _id: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  const newSession = await createSession(session.userId);
  setSessionCookies(res, newSession);

  res.status(200).json({
    message: 'Session refreshed',
  });
};

export const logoutUser = async (req: Request, res: Response) => {
  const { sessionId } = req.cookies;
  if (sessionId) {
    await Session.deleteOne({ _id: sessionId });
  }
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');
  res
    .status(200)
    .json({
      message: 'Successfully logged out',
    })
    .send();
};

export const getCurrentUser = async (req: Request, res: Response) => {
  res.status(200).json(req.user);
};
