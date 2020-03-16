import { combineReducers } from 'redux';
// import { RootState } from '../utils/interfaces';
import { postsReducer } from './postsReducer';
import { usersReducer } from './usersReducer';
import { commentsReducer } from './commentsReducer';
import { loadingReducer } from './loadingReducer';
import { errorReducer } from './errorReducer';
import { loadedReducer } from './loadedReducer';
import { queryReducer } from './queryReducer';

// export const getPosts = (state: RootState) => state.posts;
// export const getComments = (state: RootState) => state.comments;
// export const getUsers = (state: RootState) => state.users;
// export const getIsError = (state: RootState) => state.isError;
// export const getIsLoading = (state: RootState) => state.isLoading;
// export const getIsLoaded = (state: RootState) => state.isLoading;

export const initialState = {
  posts: [],
  users: [],
  comments: [],
  isLoading: false,
  isLoaded: false,
  isError: false,
  query: '',
};

export const rootReducer = combineReducers({
  posts: postsReducer,
  users: usersReducer,
  comments: commentsReducer,
  isLoaded: loadedReducer,
  isLoading: loadingReducer,
  isError: errorReducer,
  query: queryReducer,
});
