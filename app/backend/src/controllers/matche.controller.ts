import { NextFunction, Request, Response } from 'express';
import MatcheService from '../services/matche.service';

class MatcheController {
  public service: MatcheService;

  constructor(service: MatcheService) {
    this.service = service;

    this.getAll = this.getAll.bind(this);
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const matches = await this.service.getAll();

      res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }
}

export default MatcheController;
