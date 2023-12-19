import jwt from 'jsonwebtoken';
import cookie from 'cookie';

const EXPIRE_TIME = 24 * 60 * 60; // 1 day in seconds

export const generateCookie = (
  userId: string,
  expireTimeInDays: number,
  jwtSecret: string
) => {
  const token = jwt.sign({ userId }, jwtSecret, {
    expiresIn: `${expireTimeInDays}d`,
  });

  return cookie.serialize('token', token, {
    maxAge: expireTimeInDays * EXPIRE_TIME,
    httpOnly: true,
  });
};
