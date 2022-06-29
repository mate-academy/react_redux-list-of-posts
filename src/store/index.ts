import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';
import {
  Comment, Post, RootState, User,
} from '../react-app-env';
import { ActionType } from './types/types';

export const setPosts = createAction<Post[]>(ActionType.SET_POSTS);
export const setUsers = createAction<User[]>(ActionType.SET_USERS);
export const setPostComments = createAction<Comment[]>(
  ActionType.SET_POST_COMMENTS,
);

const initialState: RootState = {
  posts: [],
  users: [],
  postComments: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setPosts, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.posts = action.payload;
  });
  builder.addCase(setUsers, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.users = action.payload;
  });
  builder.addCase(setPostComments, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.postComments = action.payload;
  });
});

export const store = configureStore({
  reducer,
});
