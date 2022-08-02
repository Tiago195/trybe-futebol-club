/* eslint-disable max-len */
import { MatchesAttributes } from '../database/models/matches';
import { TeamsAttributes } from '../database/models/teams';

export interface TeamWithMatches extends TeamsAttributes {
  homeMatches: MatchesAttributes[]
  awayMatches: MatchesAttributes[]
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

type homeOrAway = 'homeTeamGoals' | 'awayTeamGoals';

interface ICalcPoints {
  casa: homeOrAway,
  away: homeOrAway,
  totalPoints: (a: number, b: MatchesAttributes) => number;
  totalVictories: (a: number, b: MatchesAttributes) => number;
  totalLosses: (a: number, b: MatchesAttributes) => number;
  totalDraws: (a: number, b: MatchesAttributes) => number;
  goalsFavor: (a: number, b: MatchesAttributes) => number;
  goalsOwn: (a: number, b: MatchesAttributes) => number;
}

const calcPoints: ICalcPoints = {
  casa: 'homeTeamGoals',
  away: 'awayTeamGoals',
  totalPoints: (a: number, b: MatchesAttributes) => {
    if (b[calcPoints.casa] > b[calcPoints.away]) return a + 3;
    if (b[calcPoints.casa] === b[calcPoints.away]) return a + 1;

    return a;
  },

  totalVictories: (a: number, b: MatchesAttributes) =>
    (b[calcPoints.casa] > b[calcPoints.away] ? a + 1 : a),

  totalLosses: (a: number, b: MatchesAttributes) =>
    (b[calcPoints.casa] < b[calcPoints.away] ? a + 1 : a),

  totalDraws: (a: number, b: MatchesAttributes) =>
    (b[calcPoints.casa] === b[calcPoints.away] ? a + 1 : a),

  goalsFavor: (a: number, b: MatchesAttributes) => a + b[calcPoints.casa],

  goalsOwn: (a: number, b: MatchesAttributes) => a + b[calcPoints.away],

};

const getAllPoints = (matches: MatchesAttributes[], casa: boolean): allPoints => {
  if (casa) {
    calcPoints.casa = 'homeTeamGoals';
    calcPoints.away = 'awayTeamGoals';
  } else {
    calcPoints.casa = 'awayTeamGoals';
    calcPoints.away = 'homeTeamGoals';
  }

  return {
    totalPoints: matches.reduce(calcPoints.totalPoints, 0),
    totalGames: matches.length,
    totalVictories: matches.reduce(calcPoints.totalVictories, 0),
    totalDraws: matches.reduce(calcPoints.totalDraws, 0),
    totalLosses: matches.reduce(calcPoints.totalLosses, 0),
    goalsFavor: matches.reduce(calcPoints.goalsFavor, 0),
    goalsOwn: matches.reduce(calcPoints.goalsOwn, 0),
  };
};

const createLeaderBoard = (matches: TeamWithMatches[], casa: boolean): leaderboard[] => matches
  .map((team: TeamWithMatches) => {
    const allPoints = getAllPoints(team.homeMatches || team.awayMatches, casa);

    return {
      name: team.teamName,
      ...allPoints,
      goalsBalance: allPoints.goalsFavor - allPoints.goalsOwn,
      efficiency: Number(((allPoints.totalPoints / (allPoints.totalGames * 3)) * 100).toFixed(2)),
    };
  });

export default createLeaderBoard;
