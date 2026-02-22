import { PostModel } from './../../models/post.model';
import DataLoader from 'dataloader';

export const makePostDataLoader = (
  getPosts: (urlParams: URLSearchParams) => Promise<PostModel[]>,
) => {
  return new DataLoader<string, PostModel[]>(async (ids) => {
    const params = new URLSearchParams();
    ids.forEach((id) => params.append('userId', id));

    const posts = await getPosts(params);

    return ids.map((id) => posts.filter((post) => post.userId === id));
  });
};
