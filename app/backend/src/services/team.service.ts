// import generateErrorObj from '../utils/generateErrorObj';
import Team from '../database/models/teams';

class TeamService {
  getAll = async () => {
    const response = await Team.findAll();

    return response;
  };
}

export default TeamService;
