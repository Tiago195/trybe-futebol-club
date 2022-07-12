/* eslint-disable max-lines-per-function */
import createLeaderBoard, { leaderboard, TeamWithMatches } from '../utils/loaderboard';
import Matches from '../database/models/matches';
import Teams from '../database/models/teams';

class LeaderboardService {
  getAllHome = async () => {
    const matches = await Teams.findAll({
      include: { model: Matches, as: 'homeMatches', where: { inProgress: false } },
    }) as unknown as TeamWithMatches[];

    const leaderboards = createLeaderBoard(matches, true);

    return this.sortLeaderBoards(leaderboards);
  };

  getAllAway = async () => {
    const matches = await Teams.findAll({
      include: { model: Matches, as: 'awayMatches', where: { inProgress: false } },
    }) as unknown as TeamWithMatches[];
    // console.log(matches);
    const leaderboards = createLeaderBoard(matches, false);
    // console.log(leaderboards);
    return this.sortLeaderBoards(leaderboards);
  };

  getAll = async () => {
    const homeTeams = await this.getAllHome();
    const awayTeams = await this.getAllAway();

    const leaderBoards = homeTeams.map((team) => {
      const awayTeam = awayTeams.find((e) => e.name === team.name) as leaderboard;

      const efficiency = Number((((team.totalPoints + awayTeam.totalPoints) / ((team
        .totalGames + awayTeam.totalGames) * 3)) * 100).toFixed(2));

      const leaderBoard = {
        name: team.name,
        totalPoints: team.totalPoints + awayTeam.totalPoints,
        totalGames: team.totalGames + awayTeam.totalGames,
        totalVictories: team.totalVictories + awayTeam.totalVictories,
        totalLosses: team.totalLosses + awayTeam.totalLosses,
        goalsFavor: team.goalsFavor + awayTeam.goalsFavor,
        goalsOwn: team.goalsOwn + awayTeam.goalsOwn,
        goalsBalance: team.goalsBalance + awayTeam.goalsBalance,
        totalDraws: team.totalDraws + awayTeam.totalDraws,
        efficiency,
      };
      return leaderBoard;
    });

    // console.log(leaderBoards);
    return this.sortLeaderBoards(leaderBoards as leaderboard[]);
  };

  private sortLeaderBoards = (leaderBoards: leaderboard[]) => leaderBoards
    .sort((a:leaderboard, b: leaderboard) => b.totalPoints - a.totalPoints
  || b.totalVictories - a.totalVictories
  || b.goalsBalance - a.goalsBalance
  || b.goalsFavor - a.goalsFavor);
}

export default LeaderboardService;
