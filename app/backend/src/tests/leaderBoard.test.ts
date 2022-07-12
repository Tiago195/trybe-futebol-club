import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user'
import { User as userModel } from  './mock/models'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes rota leaderboard', () => {
  describe('GET leaderboard caso de sucesso', () => {
    let leaderboard: Response;

    before(async() => {
      leaderboard = await chai.request(app).get('/leaderboard')
    })

    it('verifica se o status da requisição é 200', () => {
      expect(leaderboard).to.have.status(200)
    })

    it('verifica as chaves do body', () => {
      expect(leaderboard.body[0]).to.have.property('name')
      expect(leaderboard.body[0]).to.have.property('totalPoints')
      expect(leaderboard.body[0]).to.have.property('totalGames')
      expect(leaderboard.body[0]).to.have.property('totalVictories')
      expect(leaderboard.body[0]).to.have.property('totalLosses')
      expect(leaderboard.body[0]).to.have.property('goalsFavor')
      expect(leaderboard.body[0]).to.have.property('goalsOwn')
      expect(leaderboard.body[0]).to.have.property('goalsBalance')
      expect(leaderboard.body[0]).to.have.property('totalDraws')
      expect(leaderboard.body[0]).to.have.property('efficiency')
    })
  })
})