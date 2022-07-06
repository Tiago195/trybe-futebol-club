import { Model, DataTypes } from 'sequelize';
import db from "./"

class User extends Model {}

User.init({
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false
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
  }
}, {
  timestamps: false,
  underscored: true,
  sequelize: db,
  modelName: "users"
})

export default User