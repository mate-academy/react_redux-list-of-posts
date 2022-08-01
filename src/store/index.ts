/* eslint-disable no-param-reassign */
import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';
import {
  Comment,
  Post,
  State,
  User,
} from '../react-app-env';

enum ActionType {
  SET_USERS = 'SET_USERS',
  SET_POSTS = 'SET_POSTS',
  SET_USER_ID = 'SET_USER_ID',
  SET_POST_ID = 'SET_POST_ID',
  SET_POST_COMMENTS = 'SET_POST_COMMENTS',
}

const initialState: State = {
  users: [],
  posts: [],
  selectedUserId: 0,
  selectedPostId: 0,
  postComments: [],
};

export const setUsersAction = createAction<User[]>(ActionType.SET_USERS);
export const setPostsAction = createAction<Post[]>(ActionType.SET_POSTS);
export const setSelectedUserId = createAction<number>(ActionType.SET_USER_ID);
export const setSelectedPostId = createAction<number>(ActionType.SET_POST_ID);
export const setPostComments
  = createAction<Comment[]>(ActionType.SET_POST_COMMENTS);

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setUsersAction, (state, action) => {
    state.users = action.payload;
  });
  builder.addCase(setPostsAction, (state, action) => {
    state.posts = action.payload;
  });
  builder.addCase(setSelectedUserId, (state, action) => {
    state.selectedUserId = action.payload;
  });
  builder.addCase(setSelectedPostId, (state, action) => {
    state.selectedPostId = action.payload;
  });
  builder.addCase(setPostComments, (state, action) => {
    state.postComments = action.payload;
  });
});

export const store = configureStore({ reducer });
