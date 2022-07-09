import { CreateOptions, FindOptions, Identifier } from 'sequelize/types';
import Users from './Users.mock';
import Teams from './Teams.mock';
import Matches from './Matches.mock';

const mockCreate = (Instance: any, data: any) => {
  if (!data) {
    return;
  }

  const newData = data;
  if (Instance[0].id) {
    newData.id = Date.now();
  }

  if(Instance[0].homeTeamGoals) {
    newData.inProgress = true
  }
  
  Instance.push(newData);
  return newData;
};

class MockUser {
  public result: any

  set(result: any) {
    this.result = result
  }

  get() {
    return this.result
  }
}

const mockFindOne = (Instance: any, where: any) => {
  if (!where) {
    return Instance[0];
  }

  const entries = Object.entries(where);
  const result = new MockUser();

  entries.forEach((entry) => {
    const [key, value] = [entry[0], entry[1]];

    const index = Instance
      .findIndex((item: any) => !!item[key] && item[key] === value);
    if (index !== -1) {
      result.set(Instance[index])
    }
  });

  return result;
};

const mockFindAll = (Instance: any) => {
  return Instance
}

const mockFindByPk = (Instance: any, id: Identifier) => {
  return Instance.find((item: any) => item.id === id )
}

const mockUpdate = (Instance: any, data: any, where: any) => {
 const targetIndex = Instance.findIndex((item: any) => item.id === where.id)

  Instance[targetIndex] = {...Instance[targetIndex], ...data}
  
  return Instance[targetIndex]
}

export const User = {
  findOne: async (findOptions?: FindOptions) => mockFindOne(Users, findOptions!.where)
}

export const Team = {
  // findOne: async (findOptions?: FindOptions) => mockFindOne(Users, findOptions!.where)
  findAll: async () => mockFindAll(Teams),
  findByPk: async (id?: Identifier) => mockFindByPk(Teams, id!)
}

export const Matche = {
  findAll: async () => mockFindAll(Matches),
  create: async (data: any) => mockCreate(Matches, data),
  update: async (data: any, options: any) => mockUpdate(Matches, data, options)
}

export default {
  User,
  Team,
  Matche
}