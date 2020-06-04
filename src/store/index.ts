import {
  createStore,
  combineReducers,
  applyMiddleware,
  AnyAction,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';

import loadingReducer, { finishLoading, startLoading } from './loading';
import messageReducer, { setMessage } from './message';
import postReducer, { setPosts } from './post';
import queryReducer from './query';
import loadCompleteReducer, { setLoadComplete } from './loadComplete';
import { preparedPostList } from '../helpers/api';

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
  posts: postReducer,
  query: queryReducer,
  loadComplete: loadCompleteReducer,
});

// We automatically get types returned by concrete reducers
export type RootState = ReturnType<typeof rootReducer>;

// Selectors - a function receiving Redux state and returning some data from it
export const isLoading = (state: RootState) => state.loading;
export const getMessage = (state: RootState) => state.message;
export const getPosts = (state: RootState) => state.posts;
export const getQuery = (state: RootState) => state.query;
export const getIsLoaded = (state: RootState) => state.loadComplete;
/**
 * Thunk - is a function that should be used as a normal action creator
 *
 * dispatch(loadMessage())
 */
export const getVisiblePosts = (state: RootState) => {
  return state.posts
    .filter((post: PostFromServer) => (
      (post.title + post.body)
        .toLowerCase()
        .includes(state.query.toLowerCase())
    ));
};

export const loadPosts = () => {
  // inner function is an action handled by Redux Thunk
  return (dispatch: Dispatch<AnyAction>) => {
    dispatch(startLoading());

    preparedPostList()
      .then(postsFromServer => {
        dispatch(finishLoading());
        dispatch(setMessage('Success'));
        dispatch(setPosts(postsFromServer));
        dispatch(setLoadComplete());
      })
      .catch(() => {
        dispatch(setMessage('Error occurred when loading data'));
      });
  };
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
