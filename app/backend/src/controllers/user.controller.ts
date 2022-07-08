import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import jwt from '../utils/jwt';
import UserService from '../services/user.service';

class UserController {
  public service: UserService;
  constructor(service: UserService) {
    this.service = service;
    this.getFromEmailAndPassword = this.getFromEmailAndPassword.bind(this);
  }

  async getFromEmailAndPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await this.service.getFromEmailAndPassword(email, password);

      const token = jwt.encode(user);

      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  loginValidate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;

      const { data } = jwt.decode(authorization as string) as JwtPayload;

      res.status(200).json({ role: data.role });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
