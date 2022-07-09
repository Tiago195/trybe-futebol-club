import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/teams'
import { Team as TeamMock } from  './mock/models'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes rota Teams', () => {
  describe('GET teams caso de sucesso', () => {
    let teams: Response;

    before(async () => {
      sinon.stub(Team, 'findAll').callsFake(TeamMock.findAll)
      teams = await chai.request(app).get('/teams')
    })

    after(() => {
      (Team.findAll as sinon.SinonStub).restore()
    })

    it('verifica se o status da requisição é 200', async () => {
      expect(teams).to.have.status(200);
    })

    it('verifica as chaves do body', async () => {
      expect(teams.body[0]).to.have.property('id');
      expect(teams.body[0]).to.have.property('teamName');
    })

  })

  describe('GET teams/:id caso de sucesso', () => {
    let teams: Response;

    before(async () => {
      sinon.stub(Team, 'findByPk').callsFake(TeamMock.findByPk)
      teams = await chai.request(app).get('/teams/1')
    })

    after(() => {
      (Team.findByPk as sinon.SinonStub).restore()
    })

    it('verifica se o status da requisição é 200', async () => {
      expect(teams).to.have.status(200);
    })

    it('verifica as chaves do body', async () => {
      expect(teams.body).to.have.property('id');
      expect(teams.body).to.have.property('teamName');
    })
  })
})