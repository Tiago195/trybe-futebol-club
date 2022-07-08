import { FindOptions } from 'sequelize/types';
import Users from './Users.mock';

// const mockCreate = (Instance, data) => {
//   if (!data) {
//     return;
//   }

//   const newData = data;
//   if (Instance[0].id) {
//     newData.id = Date.now();
//   }
//   Instance.push(newData);
//   return newData;
// };
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

export const User = {
  findOne: async (findOptions?: FindOptions) => mockFindOne(Users, findOptions!.where)
}

export default {
  User
}