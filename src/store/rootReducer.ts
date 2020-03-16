import { combineReducers } from 'redux';
// import { RootState } from '../utils/interfaces';
import { postsReducer } from './postsReducer';
import { usersReducer } from './usersReducer';
import { commentsReducer } from './commentsReducer';
import { loadingReducer } from './loadingReducer';
import { errorReducer } from './errorReducer';
import { loadedReducer } from './loadedReducer';
import { queryReducer } from './queryReducer';

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
