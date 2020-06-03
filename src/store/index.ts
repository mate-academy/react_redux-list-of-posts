import {
  createStore, combineReducers, applyMiddleware, AnyAction,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';

import loadingReducer, { finishLoading, startLoading } from './loading';
import messageReducer, { setMessage } from './message';
import postsReducer, { setPosts } from './post';
import { getPostsFromServer } from '../helpers/api';
import searchReducer from './search';
import isLoadReducer, { setIsLoadCompleted } from './isLoadCompleted';

/**
 * Each concrete reducer will receive all the actions but only its part of the state
 *
 * const rootReducer = (state = {}, action) => ({
 *   loading: loadingReducer(state.loading, action),
 *   message: messageReducer(state.message, action),
 * })
 */
const rootReducer = combineReducers({
  loading: loadingReducer,
  message: messageReducer,
  posts: postsReducer,
  query: searchReducer,
  isLoaded: isLoadReducer,
});

// We automatically get types returned by concrete reducers
export type RootState = ReturnType<typeof rootReducer>;

// Selectors - a function receiving Redux state and returning some data from it
export const getIsLoading = (state: RootState) => state.loading;
export const getMessage = (state: RootState) => state.message;
export const getPosts = (state: RootState) => state.posts;
export const getQuery = (state: RootState) => state.query;
export const getIsLoaded = (state: RootState) => state.isLoaded;

export const getFilteredPosts = (state: RootState) => {
  return (
    [...state.posts].filter((post: PostProps) => (post.title + post.body)
      .toLowerCase()
      .includes(state.query.toLowerCase()))
  );
};

/**
 * Thunk - is a function that should be used as a normal action creator
 *
 * dispatch(loadMessage())
 */
export const loadMessage = () => {
  // inner function is an action handled by Redux Thunk
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(startLoading());

    try {
      const postsFromServer = await getPostsFromServer();

      dispatch(setPosts(postsFromServer));
      dispatch(setMessage('Load Sucsess'));
      dispatch(setIsLoadCompleted());
    } catch (error) {
      dispatch(setMessage('Error occurred when loading data'));
    }

    dispatch(finishLoading());
  };
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
