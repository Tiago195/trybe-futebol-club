import { Router } from 'express';
import MatcheService from '../services/matche.service';
import MatcheController from '../controllers/matche.controller';

const router = Router();

const matche = new MatcheController(new MatcheService());

router.get('/matches', matche.getAll);

export default router;
