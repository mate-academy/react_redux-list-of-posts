import { User, Post, Comment } from '../../react-app-env';

export enum ActionType {
  SET_POSTS = 'SET_POSTS',
  SET_USERS = 'SET_USERS',
  SET_POST_COMMENTS = 'SET_POST_COMMENTS',
}

export interface SetPostsAction {
  type: ActionType.SET_POSTS;
  payload: Post[];
}

export interface SetUsersAction {
  type: ActionType.SET_USERS;
  payload: User[];
}

export interface SetCommentsAction {
  type: ActionType.SET_POST_COMMENTS;
  payload: Comment[];
}

export type Action = SetPostsAction | SetUsersAction | SetCommentsAction;
