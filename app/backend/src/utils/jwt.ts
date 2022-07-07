import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET as string;

const jwtConfig: jwt.SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const encode = (data: any) => jwt.sign({ data }, secret, jwtConfig);

const decode = (token: string) => jwt.decode(token);

export default {
  encode,
  decode,
};
