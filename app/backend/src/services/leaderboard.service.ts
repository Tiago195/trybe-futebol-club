/* eslint-disable max-lines-per-function */
import createLeaderBoard, { leaderboard, TeamWithMatches } from '../utils/loaderboard';
import Matches from '../database/models/matches';
import Teams from '../database/models/teams';

class LeaderboardService {
  getAllHome = async () => {
    const matches = await Teams.findAll({
      include: { model: Matches, as: 'homeMatches', where: { inProgress: false } },
    }) as unknown as TeamWithMatches[];

    const leaderboards = createLeaderBoard(matches);

    return leaderboards.sort((a:leaderboard, b: leaderboard) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor);
  };
}

export default LeaderboardService;
