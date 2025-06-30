import { ThunkAction, Action } from '@reduxjs/toolkit';
import { User } from './User';
import { Post } from './Post';
import { Comment } from './Comment';
import { store } from '../app/store';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export interface UsersState {
  users: User[];
  loaded: boolean;
  hasError: boolean;
}

export interface AuthorState {
  current: User | null;
}

export interface PostsState {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
}

export interface SelectedPostState {
  current: Post | null;
}

export interface CommentsState {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
}
