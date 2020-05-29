import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';

import loadingReducer, { finishLoading, startLoading } from './loading';
import postsReducer, { setPosts } from './posts';
import { fetchPreparedPosts } from '../api/posts';
import errorReducer, { setError } from './error';
import initializedReducer, { setInitialized } from './initialized';
import queryReducer from './query';

const rootReducer = combineReducers({
  isLoading: loadingReducer,
  posts: postsReducer,
  hasError: errorReducer,
  isInitialized: initializedReducer,
  query: queryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const isLoading = (state: RootState) => state.isLoading;
export const getPosts = (state: RootState) => state.posts;
export const getError = (state: RootState) => state.hasError;
export const getInitialized = (state: RootState) => state.isInitialized;
export const getQuery = (state: RootState) => state.query;

export const loadPosts = () => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setError(false));
    dispatch(startLoading());

    try {
      const posts = await fetchPreparedPosts();

      dispatch(setPosts(posts));
    } catch (error) {
      dispatch(setError(true));
    }

    dispatch(finishLoading());
    dispatch(setInitialized(true));
  };
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
