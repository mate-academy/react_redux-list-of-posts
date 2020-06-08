import {
  createStore, combineReducers, applyMiddleware, AnyAction,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';

import loadingReducer, { finishLoading, startLoading } from './loading';
import messageReducer, { setMessage } from './message';
import isLoadReducer, { setIsLoaded } from './loadedCompleted';
import posts, { setPosts } from './posts';
import queryReducer from './search';
import { getPreparedPosts } from '../helpers/api';

const rootReducer = combineReducers({
  loading: loadingReducer,
  loaded: isLoadReducer,
  message: messageReducer,
  posts,
  query: queryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const getLoading = (state: RootState) => state.loading;
export const getMessage = (state: RootState) => state.message;
export const getPosts = (state: RootState) => state.posts;
export const getLoaded = (state: RootState) => state.loaded;
export const getQuery = (state: RootState) => state.query;

export const getVisiblePosts = (state: RootState) => {
  return state.posts
    .filter((post: PreparedPost) => (
      (post.title + post.body)
        .toLowerCase()
        .includes(state.query.toLowerCase())
    ));
};

export const loadPosts = () => {
  return (dispatch: Dispatch<AnyAction>) => {
    dispatch(startLoading());
    getPreparedPosts()
      .then(postsFromServer => {
        dispatch(finishLoading());
        dispatch(setPosts(postsFromServer));
        dispatch(setIsLoaded());
      })
      .catch(() => {
        dispatch(setMessage('Sorry'));
      });
  };
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
