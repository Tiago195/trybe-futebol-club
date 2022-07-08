import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/matches'
import { Matche as MatchesMock } from  './mock/models'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste rota matches', () => {
  describe('GET matches caso de sucesso', () => {
    let matches: Response;

    before(async () => {
      sinon.stub(Matches, 'findAll').callsFake(MatchesMock.findAll)
      matches = await chai.request(app).get('/matches')
    })

    it('verifica se o status da requisição é 200', async () => {
      // console.log(users)
      expect(matches).to.have.status(200)
    })

    it('verifica as chaves do body', async () => {
      expect(matches.body[0]).to.have.property('id')
      expect(matches.body[0]).to.have.property('homeTeam')
      expect(matches.body[0]).to.have.property('homeTeamGoals')
      expect(matches.body[0]).to.have.property('awayTeam')
      expect(matches.body[0]).to.have.property('awayTeamGoals')
      expect(matches.body[0]).to.have.property('inProgress')
    })
  })
})