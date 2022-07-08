import { Router } from 'express';
import UserService from '../services/user.service';
import UserController from '../controllers/user.controller';
import validLogin from '../middlewares/validLogin';

const router = Router();

const user = new UserController(new UserService());

router.post('/login', validLogin, user.getFromEmailAndPassword);

router.get('/login/validate', user.loginValidate);

export default router;
