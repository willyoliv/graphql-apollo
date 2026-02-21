import { ApiFiltersInput } from './../../generated/graphql';
import { RESTDataSource } from '@apollo/datasource-rest';

export class PostsApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_URL + '/posts/';
  }

  async getPosts(urlParams?: ApiFiltersInput | null) {
    return this.get('', {
      params: (urlParams as Record<string, string>) || {},
    });
  }

  async getPost(id: string) {
    return this.get(id);
  }
}
