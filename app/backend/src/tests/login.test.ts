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

describe('Testes rota login', () => {
  describe('POST login caso de sucesso', () => {
    let users: Response;
    
    before( async () => {
      sinon.stub(User, 'findAll').callsFake(userModel.findOne);
      users = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'secret_admin'
      })
    })

    after(() => {
      (User.findAll as sinon.SinonStub).restore()
    })
    it('verifica se o status da requisição é 200', async () => {
      // console.log(users)
      expect(users).to.have.status(200);
    })

    it('verifica se o body da requisição tem chave token', async () => {
      expect(users.body).to.have.property('token')
    })
  })

  describe('POST login caso de falha', () => {
    let users: Response;
    
    before( async () => {
      sinon.stub(User, 'findAll').callsFake(userModel.findOne);
      users = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'senha errada'
      })
    })

    after(() => {
      (User.findAll as sinon.SinonStub).restore()
    })
    it('verifica se o status da requisição é 200', async () => {
      // console.log(users)
      expect(users).to.have.status(401);
    })

    it('verifica se o body da requisição tem chave token', async () => {
      expect(users.body).to.have.property('message')
    })
  })

  describe('POST login/validate caso de sucesso', () => {
    let users: Response;
    
    before( async () => {
      users = await chai.request(app).get('/login/validate').set({authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20ifSwiaWF0IjoxNjU3Mjc5ODA1LCJleHAiOjE2NTc4ODQ2MDV9.MO_MzbgsW__0b00FtK1upti1RtdCbqpxtGEo-TkwI20'})
    })

    it('verifica se o status da requisição é 200', async () => {
      expect(users).to.have.status(200);
    })

    it('verifica se o body da requisição tem chave token', async () => {
      expect(users.body).to.have.property('role')
    })
  })

  // it('Seu sub-teste', () => {
  //   expect(false).to.be.eq(true);
  // });
});
