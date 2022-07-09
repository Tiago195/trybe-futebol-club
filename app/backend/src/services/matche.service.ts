import generateErrorObj from '../utils/generateErrorObj';
import Teams from '../database/models/teams';
import Matche, { MatchesCreationAttributes } from '../database/models/matches';

type Goals = Omit<MatchesCreationAttributes, 'homeTeam' | 'awayTeam'>;

class MatcheService {
  getAll = async () => {
    const response = await Matche.findAll({
      include: [
        { attributes: ['teamName'], model: Teams, as: 'teamHome' },
        { attributes: ['teamName'], model: Teams, as: 'teamAway' },
      ],
    });

    return response;
  };

  finish = async (id: number) => {
    await Matche.update({ inProgress: 0 }, { where: { id } });
  };

  create = async (newMatch: MatchesCreationAttributes) => {
    if (newMatch.homeTeam === newMatch.awayTeam) {
      throw generateErrorObj('It is not possible to create a match with two equal teams', 401);
    }

    const verifyIds = await Matche
      .findAll({ where: { id: [newMatch.awayTeam, newMatch.homeTeam] } });

    if (!verifyIds[1]) throw generateErrorObj('There is no team with such id!', 404);

    const response = await Matche.create(newMatch);

    return response;
  };

  editGoals = async (id: number, goals: Goals) => {
    await Matche.update(goals, { where: { id } });
  };
}

export default MatcheService;
