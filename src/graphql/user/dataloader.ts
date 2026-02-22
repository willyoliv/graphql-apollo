import { UserModel } from './../../models/user.model';
import DataLoader from 'dataloader';

export const makeUserDataLoader = (
  getUsers: (urlParams: URLSearchParams) => Promise<UserModel[]>,
) => {
  return new DataLoader<string, UserModel>(async (ids) => {
    const params = new URLSearchParams();
    ids.forEach((id) => params.append('id', id));
    const users = (await getUsers(params)) as UserModel[];
    return ids.map((id) => users.find((user) => user.id === id) as UserModel);
  });
};
