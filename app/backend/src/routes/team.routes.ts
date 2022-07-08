import { Router } from 'express';
import TeamService from '../services/team.service';
import TeamController from '../controllers/team.controller';

const router = Router();

const team = new TeamController(new TeamService());

router.get('/teams', team.getAll);

export default router;
