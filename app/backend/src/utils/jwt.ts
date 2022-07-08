import * as jwt from 'jsonwebtoken';
import { UserAttributes } from '../database/models/user';

const secret = process.env.JWT_SECRET as string;

const jwtConfig: jwt.SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const encode = (data: Omit<UserAttributes, 'password'>) => jwt.sign({ data }, secret, jwtConfig);

const decode = (token: string) => jwt.decode(token);

export default {
  encode,
  decode,
};
