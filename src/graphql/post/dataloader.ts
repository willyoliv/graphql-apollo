import { PostModel } from './../../models/post.model';
import DataLoader from 'dataloader';

export const makePostDataLoader = (
  getPosts: (path?: string) => Promise<Response>,
) => {
  return new DataLoader<string, PostModel[]>(async (ids) => {
    const urlQuery = ids.join('&userId=');
    const response = await getPosts('?userId=' + urlQuery);
    const posts = (await response.json()) as PostModel[];

    return ids.map((id) => posts.filter((post) => post.userId === id));
  });
};
