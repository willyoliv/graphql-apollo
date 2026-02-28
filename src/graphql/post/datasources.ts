import { CustomContext } from './../../types/context';
import { createPostFn } from './utils/post-repository';
import { CreatePostInput } from './../../generated/graphql';
import { PostModel } from './../../models/post.model';
import { makePostDataLoader } from './dataloader';
import { RESTDataSource } from '@apollo/datasource-rest';
import DataLoader from 'dataloader';

export class PostsApi extends RESTDataSource {
  public readonly dataLoader: DataLoader<string, PostModel[]>;

  constructor() {
    super();
    this.baseURL = process.env.API_URL + '/posts/';
    this.dataLoader = makePostDataLoader(this.getPosts.bind(this));
  }

  async getPosts(urlParams?: URLSearchParams) {
    return this.get('', {
      params: urlParams,
      cacheOptions: {
        ttl: 60,
      },
    });
  }

  async getPost(id: string) {
    return this.get(id, {
      cacheOptions: {
        ttl: 60,
      },
    });
  }

  async createPost(
    postData: CreatePostInput,
    dataSources: CustomContext['dataSources'],
  ) {
    const postInfo = await createPostFn(postData, dataSources);
    return this.post('', {
      body: postInfo,
    });
  }

  batchLoadByUserId(id: string) {
    return this.dataLoader.load(id);
  }
}
