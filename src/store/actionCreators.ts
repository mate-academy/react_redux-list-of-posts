import { actionType } from './actionType';


export const isLoadingCreator = (): IsLoadingCreatorInterface => ({
  type: actionType.IS_LOADING,
});

export const isLoadedCreator = (): IsLoadedCreatorInterface => ({
  type: actionType.IS_LOADED,
});

export const loadPosts = (posts: Post[]): LoadPostsInterface => ({
  type: actionType.LOAD_POSTS,
  posts,
});

export const loadUsers = (users: User[]): LoadUsersInterface => ({
  type: actionType.LOAD_USERS,
  users,
});

export const loadComments = (comments: Comment[]): LoadCommentsInterface => ({
  type: actionType.LOAD_COMMENTS,
  comments,
});

export const preparedPosts = (preparedPosts: PostsWithUser[]): PreparedPostInterface => ({
  type: actionType.PREPARED_POSTS,
  preparedPosts,
});

export const fieldFilter = (value: string): FieldFilterInterface => ({
  type: actionType.SET_FILTER_VALUE,
  value,
});


interface IsLoadingCreatorInterface {
  type: typeof actionType.IS_LOADING;
}

interface IsLoadedCreatorInterface {
  type: typeof actionType.IS_LOADED;
}

interface LoadPostsInterface {
  type: typeof actionType.LOAD_POSTS;
  posts: Post[];
}

interface LoadUsersInterface {
  type: typeof actionType.LOAD_USERS;
  users: User[];
}

interface LoadCommentsInterface {
  type: typeof actionType.LOAD_COMMENTS;
  comments: Comment[];
}

interface PreparedPostInterface {
  type: typeof actionType.PREPARED_POSTS;
  preparedPosts: PostsWithUser[];
}

interface FieldFilterInterface {
  type: typeof actionType.SET_FILTER_VALUE;
  value: string;
}


export type ActionCreatorsTypes =
  & IsLoadingCreatorInterface
  & IsLoadedCreatorInterface
  & LoadPostsInterface
  & LoadUsersInterface
  & LoadCommentsInterface
  & PreparedPostInterface
  & FieldFilterInterface;
