import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';
import loadingReducer, { finishLoading, startLoading } from './loading';
import messageReducer, { setMessage } from './message';
import usersReducer from './users';
import postsReducer from './posts';
import commentsReducer from './comments';
import { fetchMessage } from '../helpers/api';
import filterFieldReducer from './filterField';
import filteredPostsReducer from './filteredPosts';

const rootReducer = combineReducers({
  loading: loadingReducer,
  message: messageReducer,
  users: usersReducer,
  comments: commentsReducer,
  posts: postsReducer,
  filterField: filterFieldReducer,
  filteredPosts: filteredPostsReducer,
});

// We automatically get types returned by concrete reducers
export type RootState = ReturnType<typeof rootReducer>;

// Selectors - a function receiving Redux state and returning some data from it
export const isLoading = (state: RootState) => state.loading;
export const getMessage = (state: RootState) => state.message;
export const getUsers = (state: RootState) => state.users;
export const getPosts = (state: RootState) => state.posts;
export const getComments = (state: RootState) => state.comments;
export const getFilteredPostss = (state: RootState) => state.filteredPosts;

/**
 * Thunk - is a function that should be used as a normal action creator
 *
 * dispatch(loadMessage())
 */
export const loadMessage = () => {
  // inner function is an action handled by Redux Thunk
  return async (dispatch: Dispatch<any>) => {
    dispatch(startLoading());
    try {
      const message = await fetchMessage();
      dispatch(setMessage(message));
    } catch (error) {
      dispatch(setMessage('Error occurred when loading data'));
    }
    dispatch(finishLoading());
  };
};

const initialState = {
  message: 'Press to load',
  loading: false,
  posts: [],
  users: [],
  comments: [],
}

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
