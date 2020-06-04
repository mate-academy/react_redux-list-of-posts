import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';
import { createSelector } from 'reselect';
import loadingReducer, { finishLoading, startLoading } from './loading';
import messageReducer, { setMessage } from './message';
import postsReducer, { setPosts } from './posts';
import queryReducer from './query';
import { loadPosts } from '../helpers/api';

const rootReducer = combineReducers({
  loading: loadingReducer,
  posts: postsReducer,
  message: messageReducer,
  query: queryReducer,
});

export type RootState = {
  loading: {
    isLoading: boolean;
    isVisible: boolean;
  };
  message: string;
  posts: Post[];
  query: string;
};

export const isLoading = (state: RootState) => state.loading.isLoading;
export const isVisible = (state: RootState) => state.loading.isVisible;
export const getMessage = (state: RootState) => state.message;
export const getPosts = (state: RootState) => state.posts;
export const getQuery = (state: RootState) => state.query;

export const getVisiblePosts = createSelector(
  getPosts,
  getQuery,

  (posts: Post[], query: string) => {
    return posts.filter(post => (post.body + post.title)
      .toLowerCase()
      .includes(query.toLowerCase()));
  },
);

export const loadData = () => {
  return async (dispatch: Dispatch<unknown>) => {
    dispatch(startLoading());
    try {
      const postsFromServer = await loadPosts();

      dispatch(setPosts(postsFromServer));
      dispatch(setMessage('Data was received'));
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
