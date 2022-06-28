/* eslint-disable no-param-reassign */
import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';
import {
  Post, State, User, Comment,
} from '../react-app-env';

const initialState: State = {
  posts: [],
  users: [],
  selectedUserId: 0,
  selectedPostId: 0,
  selectedPostComments: [],
};

enum ActionType {
  SET_POSTS = 'SET_POSTS',
  SET_USERS = 'SET_USERS',
  SET_SELECTED_USER_ID = 'SET_SELECTED_USER_ID',
  SET_SELECTED_POST_ID = 'SET_SELECTED_POST_ID',
  SET_SELECTED_POST_COMMENTS = 'SET_SELECTED_POST_COMMENTS',
}

export const setPosts = createAction<Post[]>(ActionType.SET_POSTS);
export const setUsers = createAction<User[]>(ActionType.SET_USERS);
export const setSelectedUserId
  = createAction<number>(ActionType.SET_SELECTED_USER_ID);
export const setSelectedPostId
  = createAction<number>(ActionType.SET_SELECTED_POST_ID);
export const setSelectedPostComments
  = createAction<Comment[]>(ActionType.SET_SELECTED_POST_COMMENTS);

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setPosts, (state, action) => {
    state.posts = action.payload;
  });
  builder.addCase(setUsers, (state, action) => {
    state.users = action.payload;
  });
  builder.addCase(setSelectedUserId, (state, action) => {
    state.selectedUserId = action.payload;
  });
  builder.addCase(setSelectedPostId, (state, action) => {
    state.selectedPostId = action.payload;
  });
  builder.addCase(setSelectedPostComments, (state, action) => {
    state.selectedPostComments = action.payload;
  });
});

export const store = configureStore({ reducer });
