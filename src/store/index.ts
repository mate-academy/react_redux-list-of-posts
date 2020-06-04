import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';

import loadingReducer, { finishLoading, startLoading } from './loading';
import { fetchPreparedPosts } from '../helpers/api';
import errorReducer, { setError } from './error';
import postsReducer, { setPosts } from './posts';
import queryReducer from './query';

/**
 * Each concrete reducer will receive all the actions but only its part of the state
 *
 * const rootReducer = (state = {}, action) => ({
 *   loading: loadingReducer(state.loading, action),
 *   message: messageReducer(state.message, action),
 * })
 */
const rootReducer = combineReducers({
  loadingStatus: loadingReducer,
  error: errorReducer,
  posts: postsReducer,
  query: queryReducer,
});

// We automatically get types returned by concrete reducers
export type RootState = ReturnType<typeof rootReducer>;

// Selectors - a function receiving Redux state and returning some data from it
export const getIsLoading = (state: RootState) => state.loadingStatus.loading;
export const getIsLoaded = (state: RootState) => state.loadingStatus.loaded;
export const getError = (state: RootState) => state.error;
export const getPosts = (state: RootState) => state.posts;
export const getQuery = (state: RootState) => state.query;

/**
 * Thunk - is a function that should be used as a normal action creator
 *
 * dispatch(loadMessage())
 */
export const loadPosts = () => {
  // inner function is an action handled by Redux Thunk
  return async (dispatch: Dispatch<any>) => {
    dispatch(startLoading());

    try {
      const fetchedPosts = await fetchPreparedPosts();
      dispatch(setPosts(fetchedPosts));

    } catch (error) {
      dispatch(setError('Error occurred when loading data'));
    }

    dispatch(finishLoading());
  };
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
