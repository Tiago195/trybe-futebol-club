import { Router } from 'express';
import UserService from '../services/user.service';
import UserController from '../controllers/user.controller';

const router = Router();

const user = new UserController(new UserService());

router.post('/login', user.getFromEmailAndPassword);

export default router;
