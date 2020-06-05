import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';

import loadingReducer, { finishLoading, startLoading } from './loading';
import loadedReducer, { setLoaded } from './loaded';
import postsReducer, { setPosts } from './posts';
import errorMessageReducer, { setErrorMessage } from './errorMessage';
import { getDataPosts } from '../helpers/api';


const rootReducer = combineReducers({
  loading: loadingReducer,
  loaded: loadedReducer,
  posts: postsReducer,
  message: errorMessageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const isLoading = (state: RootState) => state.loading;
export const getErrorMessage = (state: RootState) => state.message;
export const getPosts = (state: RootState) => state.posts;
export const isLoaded = (state: RootState) => state.loaded;

export const loadDataPosts = () => {

  return async (dispatch: Dispatch<any>) => {
    dispatch(startLoading());

    try {
      const posts = await getDataPosts();

      dispatch(setPosts(posts));
      dispatch(setLoaded());
    } catch (error) {
      dispatch(setErrorMessage('Sorry, Something is wrong'));
    }

    dispatch(finishLoading());
  };
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
