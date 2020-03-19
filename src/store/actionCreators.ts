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

export const fieldFilter = (value: string): FieldFilterInterface => ({
  type: actionType.FIELD_FILTER,
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

interface FieldFilterInterface {
  type: typeof actionType.FIELD_FILTER;
  value: string;
}


export type ActionCreatorsTypes =
  & IsLoadingCreatorInterface
  & IsLoadedCreatorInterface
  & LoadPostsInterface
  & LoadUsersInterface
  & LoadCommentsInterface
  & FieldFilterInterface;
