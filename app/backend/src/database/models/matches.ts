import { Model, DataTypes, Optional } from 'sequelize';
import db from '.';
import Teams from './teams';

export type MatchesAttributes = {
  id: number
  homeTeam: number
  homeTeamGoals: number
  awayTeam: number
  awayTeamGoals: number
  inProgress: number
};

type MatchesCreationAttributes = Optional<MatchesAttributes, 'id'>;

class Matches extends Model<MatchesAttributes, MatchesCreationAttributes> {}

Matches.init({
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  homeTeam: {
    type: DataTypes.INTEGER,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
  },
  awayTeam: {
    type: DataTypes.INTEGER,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
  },
  inProgress: {
    type: DataTypes.INTEGER,
  },
}, {
  timestamps: false,
  underscored: true,
  sequelize: db,
  modelName: 'matches',
});

Matches.belongsTo(Teams, {
  as: 'teamHome',
  foreignKey: 'homeTeam',
});

Matches.belongsTo(Teams, {
  as: 'teamAway',
  foreignKey: 'awayTeam',
});

export default Matches;
