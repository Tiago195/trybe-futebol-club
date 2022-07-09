import { Router } from 'express';
import validToken from '../middlewares/validToken';
import MatcheService from '../services/matche.service';
import MatcheController from '../controllers/matche.controller';

const router = Router();

const matche = new MatcheController(new MatcheService());

router.get('/matches', matche.getAll);
router.post('/matches', validToken, matche.create);
router.patch('/matches/:id/finish', matche.finish);
router.patch('/matches/:id', matche.editGoals);

export default router;
