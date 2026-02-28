import { cleanUrlFilterParams } from './../../../utils/cleanUrlFilterParams';
import { CustomContext } from './../../../types/context';
import {
  CreatePostInput,
  ApiFiltersInput,
  InputMaybe,
} from './../../../generated/graphql';
import { GraphQLError } from 'graphql';
import { ApolloServerErrorCode } from '@apollo/server/errors';

export const createPostFn = async (
  postData: CreatePostInput,
  dataSource: CustomContext['dataSources'],
) => {
  const postInfo = await createPostInfo(postData, dataSource);
  const { title, body, userId } = postInfo;

  if (!title || !body || !userId) {
    throw new GraphQLError('You have to send title, body and userId', {
      extensions: {
        code: ApolloServerErrorCode.BAD_USER_INPUT,
        http: { status: 400 },
      },
    });
  }

  return postInfo;
};

const userExists = async (
  userId: string,
  dataSource: CustomContext['dataSources'],
) => {
  try {
    await dataSource.usersApi.getUser(userId);
  } catch {
    throw new GraphQLError(`User ${userId} does not exist`, {
      extensions: {
        code: ApolloServerErrorCode.BAD_USER_INPUT,
        argumentName: 'userId',
        http: { status: 400 },
      },
    });
  }
};

const createPostInfo = async (
  postData: CreatePostInput,
  dataSource: CustomContext['dataSources'],
) => {
  const { title, body, userId } = postData;

  await userExists(userId, dataSource);

  const filters = {
    _limit: 1,
    _sort: 'indexRef',
    _order: 'desc',
  } as unknown as InputMaybe<ApiFiltersInput>;

  const cleanFilters = cleanUrlFilterParams(filters);
  const apiFiltersInput = new URLSearchParams(cleanFilters);

  const indexRefPost = await dataSource.postsApi.getPosts(apiFiltersInput);

  const indexRef = indexRefPost[0].indexRef + 1;

  return {
    title,
    body,
    userId,
    indexRef,
    createdAt: new Date().toISOString(),
  };
};
