import { Post, User, Comment } from '../react-app-env';

export const LOAD_POSTS = 'LOAD_POSTS';
export const LOAD_USERS = 'LOAD_USER';
export const LOAD_COMMENTS = 'LOAD_COMMENTS';
export const LOAD_POST = 'LOAD_POST';
export const CHANGE_POST = 'CHANGE_POST';
export const CHANGE_USER = 'CHANGE_USER';

export const loadPostsAction = (payload: Post[]) => ({
  type: LOAD_POSTS,
  payload,
});

export const loadPostAction = (payload: Post[]) => ({
  type: LOAD_POSTS,
  payload,
});

export const loadUserAction = (payload: User[]) => ({
  type: LOAD_USERS,
  payload,
});

export const loadCommentsAction = (payload: Comment[]) => ({
  type: LOAD_COMMENTS,
  payload,
});

export const changePostAction = (payload: number) => ({
  type: CHANGE_POST,
  payload,
});

export const changeUserIdAction = (payload: number) => ({
  type: CHANGE_USER,
  payload,
});

export const changePostIdAction = (payload?: number | null) => ({
  type: CHANGE_USER,
  payload,
});
