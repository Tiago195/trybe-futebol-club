import { NextFunction, Request, Response } from 'express';
import TeamService from '../services/team.service';

class TeamController {
  public service: TeamService;
  constructor(service: TeamService) {
    this.service = service;

    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await this.service.getAll();

      res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const team = await this.service.getById(Number(id));

      res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  }
}

export default TeamController;
