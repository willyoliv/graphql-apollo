import { GraphQLResolveInfo } from 'graphql';
import { CustomContext } from '../types/context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export enum ApiFilterOrder {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type ApiFiltersInput = {
  _limit?: InputMaybe<Scalars['Int']['input']>;
  _order?: InputMaybe<ApiFilterOrder>;
  _sort?: InputMaybe<Scalars['String']['input']>;
  _start?: InputMaybe<Scalars['Int']['input']>;
};

export type Post = {
  __typename?: 'Post';
  body: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  indexRef: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  unixTimestamp: Scalars['String']['output'];
};

export type PostError = {
  message: Scalars['String']['output'];
  statusCode: Scalars['Int']['output'];
};

export type PostNotFoundError = PostError & {
  __typename?: 'PostNotFoundError';
  message: Scalars['String']['output'];
  postId: Scalars['String']['output'];
  statusCode: Scalars['Int']['output'];
};

export type PostResult = Post | PostNotFoundError | PostTimeoutError;

export type PostTimeoutError = PostError & {
  __typename?: 'PostTimeoutError';
  message: Scalars['String']['output'];
  statusCode: Scalars['Int']['output'];
  timeout: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['Boolean']['output']>;
  post: PostResult;
  posts: Array<Post>;
  user: User;
  users: Array<User>;
};

export type QueryPostArgs = {
  id: Scalars['ID']['input'];
};

export type QueryPostsArgs = {
  filters?: InputMaybe<ApiFiltersInput>;
};

export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type QueryUsersArgs = {
  filters?: InputMaybe<ApiFiltersInput>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  indexRef: Scalars['Int']['output'];
  lastName: Scalars['String']['output'];
  userName: Scalars['String']['output'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<
  TResult,
  TParent = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
  TArgs = Record<PropertyKey, never>,
> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
  TArgs = Record<PropertyKey, never>,
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<
  TTypes,
  TParent = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<
  T = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = Record<PropertyKey, never>,
  TParent = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
  TArgs = Record<PropertyKey, never>,
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<_RefType extends Record<string, unknown>> =
  ResolversObject<{
    PostResult: Post | PostNotFoundError | PostTimeoutError;
  }>;

/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> =
  ResolversObject<{
    PostError: PostNotFoundError | PostTimeoutError;
  }>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  ApiFilterOrder: ApiFilterOrder;
  ApiFiltersInput: ApiFiltersInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Post: ResolverTypeWrapper<Post>;
  PostError: ResolverTypeWrapper<
    ResolversInterfaceTypes<ResolversTypes>['PostError']
  >;
  PostNotFoundError: ResolverTypeWrapper<PostNotFoundError>;
  PostResult: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>['PostResult']
  >;
  PostTimeoutError: ResolverTypeWrapper<PostTimeoutError>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  ApiFiltersInput: ApiFiltersInput;
  Boolean: Scalars['Boolean']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Post: Post;
  PostError: ResolversInterfaceTypes<ResolversParentTypes>['PostError'];
  PostNotFoundError: PostNotFoundError;
  PostResult: ResolversUnionTypes<ResolversParentTypes>['PostResult'];
  PostTimeoutError: PostTimeoutError;
  Query: Record<PropertyKey, never>;
  String: Scalars['String']['output'];
  User: User;
}>;

export type PostResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes['Post'] =
    ResolversParentTypes['Post'],
> = ResolversObject<{
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  indexRef?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  unixTimestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PostErrorResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes['PostError'] =
    ResolversParentTypes['PostError'],
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    'PostNotFoundError' | 'PostTimeoutError',
    ParentType,
    ContextType
  >;
}>;

export type PostNotFoundErrorResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes['PostNotFoundError'] =
    ResolversParentTypes['PostNotFoundError'],
> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  postId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  statusCode?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PostResultResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes['PostResult'] =
    ResolversParentTypes['PostResult'],
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    'Post' | 'PostNotFoundError' | 'PostTimeoutError',
    ParentType,
    ContextType
  >;
}>;

export type PostTimeoutErrorResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes['PostTimeoutError'] =
    ResolversParentTypes['PostTimeoutError'],
> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  statusCode?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timeout?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes['Query'] =
    ResolversParentTypes['Query'],
> = ResolversObject<{
  _empty?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  post?: Resolver<
    ResolversTypes['PostResult'],
    ParentType,
    ContextType,
    RequireFields<QueryPostArgs, 'id'>
  >;
  posts?: Resolver<
    Array<ResolversTypes['Post']>,
    ParentType,
    ContextType,
    Partial<QueryPostsArgs>
  >;
  user?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, 'id'>
  >;
  users?: Resolver<
    Array<ResolversTypes['User']>,
    ParentType,
    ContextType,
    Partial<QueryUsersArgs>
  >;
}>;

export type UserResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes['User'] =
    ResolversParentTypes['User'],
> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  indexRef?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type Resolvers<ContextType = CustomContext> = ResolversObject<{
  Post?: PostResolvers<ContextType>;
  PostError?: PostErrorResolvers<ContextType>;
  PostNotFoundError?: PostNotFoundErrorResolvers<ContextType>;
  PostResult?: PostResultResolvers<ContextType>;
  PostTimeoutError?: PostTimeoutErrorResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;
