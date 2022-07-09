import { MatchesAttributes } from '../database/models/matches';
import { TeamsAttributes } from '../database/models/teams';

export interface TeamWithMatches extends TeamsAttributes{
  homeMatches: MatchesAttributes[]
}

export interface leaderboard {
  name: string
  totalPoints: number
  totalGames: number
  totalVictories: number
  totalDraws: number
  totalLosses: number
  goalsFavor: number
  goalsOwn: number
  goalsBalance: number
  efficiency: number
}

type allPoints = Omit<leaderboard, 'name' | 'goalsBalance' | 'efficiency'>;

const calcPoints = {
  totalPoints: (a: number, b: MatchesAttributes) => {
    if (b.homeTeamGoals > b.awayTeamGoals) return a + 3;
    if (b.homeTeamGoals === b.awayTeamGoals) return a + 1;

    return a;
  },

  totalVictories: (a: number, b: MatchesAttributes) =>
    (b.homeTeamGoals > b.awayTeamGoals ? a + 1 : a),

  totalLosses: (a: number, b: MatchesAttributes) =>
    (b.homeTeamGoals < b.awayTeamGoals ? a + 1 : a),

  totalDraws: (a: number, b: MatchesAttributes) =>
    (b.homeTeamGoals === b.awayTeamGoals ? a + 1 : a),

  goalsFavor: (a: number, b: MatchesAttributes) => a + b.homeTeamGoals,

  goalsOwn: (a: number, b: MatchesAttributes) => a + b.awayTeamGoals,

};

const getAllPoints = (matches: MatchesAttributes[]): allPoints => ({
  totalPoints: matches.reduce(calcPoints.totalPoints, 0),
  totalGames: matches.length,
  totalVictories: matches.reduce(calcPoints.totalVictories, 0),
  totalDraws: matches.reduce(calcPoints.totalDraws, 0),
  totalLosses: matches.reduce(calcPoints.totalLosses, 0),
  goalsFavor: matches.reduce(calcPoints.goalsFavor, 0),
  goalsOwn: matches.reduce(calcPoints.goalsOwn, 0),
});

const createLeaderBoard = (matches: TeamWithMatches[]): leaderboard[] => matches
  .map((team: TeamWithMatches) => {
    const allPoints = getAllPoints(team.homeMatches);
    return {
      name: team.teamName,
      ...allPoints,
      goalsBalance: allPoints.goalsFavor - allPoints.goalsOwn,
      efficiency: Number(((allPoints.totalPoints / (allPoints.totalGames * 3)) * 100).toFixed(2)),
    };
  });

export default createLeaderBoard;
