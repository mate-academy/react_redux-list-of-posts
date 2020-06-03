import {
  createStore, combineReducers, applyMiddleware, AnyAction,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';

import loadingReducer, { finishLoading, startLoading } from './loading';
import messageReducer, { setMessage } from './message';
import isLoadReducer, { setIsLoaded } from './loadedComleted';
import posts, { handleSuccess } from './posts';
import queryReducer from './search';
import { getPreparedPosts } from '../helpers/api';
// import { fetchMessage } from '../helpers/api';


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
  loaded: isLoadReducer,
  message: messageReducer,
  posts,
  query: queryReducer,
});

// We automatically get types returned by concrete reducers
export type RootState = ReturnType<typeof rootReducer>;

// Selectors - a function receiving Redux state and returning some data from it
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

/**
 * Thunk - is a function that should be used as a normal action creator
 *
 * dispatch(loadMessage())
 */

export const loadPosts = () => {
  return (dispatch: Dispatch<AnyAction>) => {
    dispatch(startLoading());

    getPreparedPosts()
      .then(postsFromServer => {
        dispatch(finishLoading());
        dispatch(handleSuccess(postsFromServer));
        dispatch(setIsLoaded());
      })
      .catch(() => {
        dispatch(setMessage('Oops! Something went wrong... :('));
      });
  };
};


const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
