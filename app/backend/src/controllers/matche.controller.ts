import { NextFunction, Request, Response } from 'express';
import MatcheService from '../services/matche.service';

class MatcheController {
  public service: MatcheService;

  constructor(service: MatcheService) {
    this.service = service;

    this.getAll = this.getAll.bind(this);
    this.finish = this.finish.bind(this);
    this.create = this.create.bind(this);
    this.editGoals = this.editGoals.bind(this);
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const matches = await this.service.getAll();

      res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }

  async finish(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await this.service.finish(Number(id));

      res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

      const matche = await this.service
        .create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals });

      res.status(201).json(matche);
    } catch (error) {
      next(error);
    }
  }

  async editGoals(req: Request, res: Response, next: NextFunction) {
    try {
      const { homeTeamGoals, awayTeamGoals } = req.body;
      const { id } = req.params;

      await this.service.editGoals(Number(id), { homeTeamGoals, awayTeamGoals });

      res.status(200).json({ message: 'Edited' });
    } catch (error) {
      next(error);
    }
  }
}

export default MatcheController;
