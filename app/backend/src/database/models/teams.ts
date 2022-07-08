import { Model, DataTypes, Optional } from 'sequelize';
import db from '.';

export type TeamsAttributes = {
  id: number,
  teamName: string
};

type TeamsCreationAttributes = Optional<TeamsAttributes, 'id'>;

class Teams extends Model<TeamsAttributes, TeamsCreationAttributes> {}

Teams.init({
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  teamName: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: false,
  underscored: true,
  sequelize: db,
  modelName: 'teams',
});

export default Teams;
