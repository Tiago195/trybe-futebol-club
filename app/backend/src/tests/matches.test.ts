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

  describe('POST matches caso de sucesso', () => {
    let matche: Response;

    before(async () => {
      sinon.stub(Matches, 'create').callsFake(MatchesMock.create)
      matche = await chai.request(app).post('/matches').send({
        "homeTeam": 16, 
        "awayTeam": 8,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2
      })
      .set({Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20ifSwiaWF0IjoxNjU3Mzc1OTQ1LCJleHAiOjE2NTc5ODA3NDV9.Jaw-E-cM6_uVBg_0-4HKUeZhZDZ93QlhIoAK9DrOoNM'})
    })

    after(() => {
      (Matches.create as sinon.SinonStub).restore()
    })

    it('verifica as chaves do body', () => {
      expect(matche.body).to.have.property('id')
      expect(matche.body).to.have.property('homeTeam')
      expect(matche.body).to.have.property('homeTeamGoals')
      expect(matche.body).to.have.property('awayTeam')
      expect(matche.body).to.have.property('awayTeamGoals')
      expect(matche.body).to.have.property('inProgress')
    })
  })

  describe('PATCH matches/:id/finish caso de sucesso', () => {
    let matche: Response;

    before(async () => {
      sinon.stub(Matches, 'update').callsFake(MatchesMock.update)
      matche = await chai.request(app).patch('/matches/3/finish')
    })

    after(() => {
      (Matches.update as sinon.SinonStub).restore()
    })

    it('verifica se o status da requisição é 200', () => {
      expect(matche).to.have.status(200)
    })

    it('verifica os status do body', () => {
      expect(matche.body).to.have.property('message')
    })
  })

  describe('PATCH matches/:id caso de sucesso', () => {
    let matche: Response;

    before(async () => {
      sinon.stub(Matches, 'update').callsFake(MatchesMock.update)
      matche = await chai.request(app).patch('/matches/4').send({
        "homeTeamGoals": 3,
        "awayTeamGoals": 1
      })
    })

    after(() => {
      (Matches.update as sinon.SinonStub).restore()
    })

    it('verifica se o status da requisiçao é 200', () => {
      expect(matche).to.have.status(200)
    })

    it('verifica os status do body', () => {
      expect(matche.body).to.have.property('message')
    })
  })
})