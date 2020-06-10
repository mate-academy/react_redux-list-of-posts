import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';

import loadingReducer, { finishLoading, startLoading } from './loading';
import loadedReducer, { setLoaded } from './loaded';
import messageReducer, { setMessage } from './message';
import postsReducer, { setPosts } from './posts';
import filteredPostsReducer from './filteredPosts';
import { getPreparedPosts } from '../helpers/api';

const rootReducer = combineReducers({
  loading: loadingReducer,
  message: messageReducer,
  posts: postsReducer,
  filteredPosts: filteredPostsReducer,
  loaded: loadedReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const isLoading = (state: RootState) => state.loading;
export const getMessage = (state: RootState) => state.message;
export const getPosts = (state: RootState) => state.posts;
export const getfilteredPosts = (state: RootState) => state.filteredPosts;
export const getIsLoaded = (state: RootState) => state.loaded;
export const loadPosts = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch(startLoading());

    getPreparedPosts()
      .then(postFromServer => {
        dispatch(setPosts(postFromServer));
        dispatch(setMessage('Loaded'));
        dispatch(setLoaded(true));
      })
      .catch(() => {
        dispatch(setMessage('Error occurred when loading data'));
        dispatch(setLoaded(false));
      });

    dispatch(finishLoading());
  };
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
