import DataLoader from 'dataloader';
import { User } from '../../generated/graphql';

export const makeUserDataLoader = (
  getUsers: (path?: string) => Promise<Response>,
) => {
  return new DataLoader(async (ids) => {
    const urlQuery = ids.join('&id=');
    const response = await getUsers('?id=' + urlQuery);
    const users = (await response.json()) as User[];
    return ids.map((id) => users.find((user) => user.id === id) as User);
  });
};
