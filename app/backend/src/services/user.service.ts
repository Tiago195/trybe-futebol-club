import User from '../database/models/user';

class UserService {
  getFromEmailAndPassword = async (email: string, password: string) => {
    const user = await User.findOne({ where: { email, password } });
    return user;
  };
}

export default UserService;
