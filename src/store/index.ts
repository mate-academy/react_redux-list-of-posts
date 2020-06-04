import { createStore, combineReducers, applyMiddleware, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';
import { createSelector } from 'reselect';

import loadingReducer, { finishLoading, startLoading } from './loading';
import messageReducer, { setMessage } from './message';
import { preparedPosts } from '../helpers/api';
import postsReducer, { setPosts } from './posts';
import queryReducer from './query';
import visibilityReducer, { visibility } from './downloading';

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
  query: queryReducer,
  visibility: visibilityReducer,
});

// We automatically get types returned by concrete reducers
export type RootState = ReturnType<typeof rootReducer>;

// Selectors - a function receiving Redux state and returning some data from it
export const isLoading = (state: RootState) => state.loading;
export const getMessage = (state: RootState) => state.message;
export const getPosts = (state: RootState) => state.posts;
export const getQuery = (state: RootState) => state.query;
export const isVisible = (state: RootState) => state.visibility;

export const getVisiblePosts = createSelector(
  getPosts,
  getQuery,

  (posts: PreparedPost[], query: string) => {
    return [...posts]
      .filter(post => (post.title + post.body)
        .toLowerCase()
        .includes(query.toLowerCase()));
  }
)
/**
 * Thunk - is a function that should be used as a normal action creator
 *
 * dispatch(loadMessage())
 */
export const loadData = () => {
  // inner function is an action handled by Redux Thunk
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(startLoading());
    dispatch(visibility())
    try {
      const postsFromServer = await preparedPosts();

      dispatch(setMessage('Data is received'));
      dispatch(setPosts(postsFromServer))
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
