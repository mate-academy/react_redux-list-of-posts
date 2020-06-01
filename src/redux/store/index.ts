import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';

import loadingReducer, { finishLoading, startLoading } from './loading';
import postsReducer, { setPosts } from './posts';
import { fetchPreparedPosts } from '../../helpers/api';
import errorReducer, { setError } from './error';
import initialReducer, { setInitialized } from './initialized';

const rootReducer = combineReducers({
  isLoading: loadingReducer,
  posts: postsReducer,
  hasError: errorReducer,
  isInitialized: initialReducer,
});

export type RootState = ReturnType<typeof rootReducer>;


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
