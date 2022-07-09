import { NextFunction, Request, Response } from 'express';
import generateErrorObj from '../utils/generateErrorObj';
import jwt from '../utils/jwt';

const validToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) next(generateErrorObj('Token must be a valid token', 401));

  const token = jwt.decode(authorization as string);

  if (!token) next(generateErrorObj('Token must be a valid token', 401));

  next();
};

export default validToken;
