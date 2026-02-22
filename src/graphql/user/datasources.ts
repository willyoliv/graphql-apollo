import { UserModel } from './../../models/user.model';

import { makeUserDataLoader } from './dataloader';
import { RESTDataSource } from '@apollo/datasource-rest';
import DataLoader from 'dataloader';

export class UsersApi extends RESTDataSource {
  public readonly dataLoader: DataLoader<string, UserModel>;

  constructor() {
    super();
    this.baseURL = process.env.API_URL + '/users/';
    this.dataLoader = makeUserDataLoader(this.getUsers.bind(this));
  }

  async getUsers(urlParams?: URLSearchParams) {
    return this.get('', {
      params: urlParams,
      cacheOptions: {
        ttl: 60,
      },
    });
  }

  async getUser(id: string) {
    return this.get(id, {
      cacheOptions: {
        ttl: 60,
      },
    });
  }

  batchLoadByPostId(id: string) {
    return this.dataLoader.load(id);
  }
}
