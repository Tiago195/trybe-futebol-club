// import generateErrorObj from '../utils/generateErrorObj';
import Team from '../database/models/teams';

class TeamService {
  getAll = async () => {
    const response = await Team.findAll();

    return response;
  };

  getById = async (id: number) => {
    const response = await Team.findByPk(id);

    return response;
  };
}

export default TeamService;
