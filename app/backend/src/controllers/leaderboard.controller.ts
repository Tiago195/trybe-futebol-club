import { NextFunction, Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

class LeaderboardController {
  public service: LeaderboardService;
  constructor(service: LeaderboardService) {
    this.service = service;
    this.getAllHome = this.getAllHome.bind(this);
    this.getAllAway = this.getAllAway.bind(this);
    this.getAll = this.getAll.bind(this);
  }

  async getAllHome(req: Request, res: Response, next: NextFunction) {
    try {
      const leaderboards = await this.service.getAllHome();

      res.status(200).json(leaderboards);
    } catch (error) {
      next(error);
    }
  }

  async getAllAway(req: Request, res: Response, next: NextFunction) {
    try {
      const leaderboards = await this.service.getAllAway();

      res.status(200).json(leaderboards);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const leaderboards = await this.service.getAll();

      res.status(200).json(leaderboards);
    } catch (error) {
      next(error);
    }
  }
}

export default LeaderboardController;
