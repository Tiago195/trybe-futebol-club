import * as bc from 'bcryptjs';
import generateErrorObj from '../utils/generateErrorObj';
import User, { UserAttributes } from '../database/models/user';

class UserService {
  getFromEmailAndPassword = async (email: string, password: string) => {
    const response = await User.findOne({ where: { email } });

    const { password: passwordRemoved, ...user } = response?.get() as UserAttributes;

    const isPassword = await bc.compare(password, passwordRemoved);

    if (!isPassword) throw generateErrorObj('Incorrect email or password', 401);

    return user;
  };
}

export default UserService;
