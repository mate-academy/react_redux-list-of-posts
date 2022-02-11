import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';

// import loadingReducer, { finishLoading, startLoading } from './loading';
// import messageReducer, { setMessage } from './message';
// import { fetchMessage } from '../helpers/api';
import postsReducer, { setPosts } from './postsListSlice';

import { getUserPosts } from '../api/posts';

/**
 * Each concrete reducer will receive all the actions but only its part of the state
 *
 * const rootReducer = (state = {}, action) => ({
 *   loading: loadingReducer(state.loading, action),
 *   message: messageReducer(state.message, action),
 * })
 */
const rootReducer = combineReducers({
  postsListSlice: postsReducer,
});

// We automatically get types returned by concrete reducers
// export type RootState = ReturnType<typeof rootReducer>;

// Selectors - a function receiving Redux state and returning some data from it
// export const isLoading = (state: RootState) => state.loading;
// export const getMessage = (state: RootState) => state.message;

/**
 * Thunk - is a function that should be used as a normal action creator
 *
 * dispatch(loadMessage())
 */
export const getPostsFromServer = () => {
  // inner function is an action handled by Redux Thunk
  return async (dispatch: Dispatch<any>) => {
    try {
      // eslint-disable-next-line no-console
      console.log('loading posts');
      const posts = await getUserPosts();

      // eslint-disable-next-line no-console
      console.log('loadED posts');

      dispatch(setPosts(posts));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error loading posts');
    }
  };
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
