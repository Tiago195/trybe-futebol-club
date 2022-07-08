import Teams from '../database/models/teams';
import Matche from '../database/models/matches';

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
}

export default MatcheService;
