import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';
import LeaderboardService from '../services/leaderboard.service';

const router = Router();

const leaderboard = new LeaderboardController(new LeaderboardService());

router.get('/leaderboard/home', leaderboard.getAllHome);
router.get('/leaderboard/away', leaderboard.getAllAway);
router.get('/leaderboard', leaderboard.getAll);

export default router;
