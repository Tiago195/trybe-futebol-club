import { Model, DataTypes, Optional } from 'sequelize';
import db from '.';

type UserAttributes = {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string,
};

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

class User extends Model<UserAttributes, UserCreationAttributes> {}

User.init({
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: false,
  underscored: true,
  sequelize: db,
  modelName: 'users',
});

export default User;
