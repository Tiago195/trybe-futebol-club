import { NextFunction, Request, Response } from 'express';
import generateErrorObj from '../utils/generateErrorObj';

const validLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) next(generateErrorObj('All fields must be filled', 400));

  next();
};

export default validLogin;
