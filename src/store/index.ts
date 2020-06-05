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
import loadCompleteReducer, { setLoadCompleted } from './loadComplete';
import { preparedPostList } from '../helpers/api';

const rootReducer = combineReducers({
  loading: loadingReducer,
  message: messageReducer,
  posts: postReducer,
  query: queryReducer,
  loadComplete: loadCompleteReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const isLoading = (state: RootState) => state.loading;
export const getMessage = (state: RootState) => state.message;
export const getPosts = (state: RootState) => state.posts;
export const getQuery = (state: RootState) => state.query;
export const getIsLoaded = (state: RootState) => state.loadComplete;

export const getVisiblePosts = (state: RootState) => {
  return state.posts
    .filter((post: Post) => (
      (post.title + post.body)
        .toLowerCase()
        .includes(state.query.toLowerCase())
    ));
};

export const loadPosts = () => {

  return (dispatch: Dispatch<AnyAction>) => {
    dispatch(startLoading());

    preparedPostList()
      .then(postsFromServer => {
        dispatch(finishLoading());
        dispatch(setMessage('Success'));
        dispatch(setPosts(postsFromServer));
        dispatch(setLoadCompleted());
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
