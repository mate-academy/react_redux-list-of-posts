import {
  createStore, combineReducers, applyMiddleware, AnyAction,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';

import loadingReducer, { finishLoading, startLoading } from './loading';
import messageReducer, { setMessage } from './message';
import postsReducer, { setPosts } from '../components/post';
import { getPostsFromServer } from '../helpers/api';
import searchReducer from './search';
import isLoadReducer, { setIsLoadCompleted } from './isLoadCompleted';

const rootReducer = combineReducers({
  loading: loadingReducer,
  message: messageReducer,
  posts: postsReducer,
  query: searchReducer,
  isLoaded: isLoadReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const isLoading = (state: RootState) => state.loading;
export const getIsLoading = (state: RootState) => state.loading;
export const getMessage = (state: RootState) => state.message;
export const getPosts = (state: RootState) => state.posts;
export const getQuery = (state: RootState) => state.query;
export const getIsLoaded = (state: RootState) => state.isLoaded;

export const getFilteredPosts = (state: RootState) => {
  return (
    [...state.posts].filter((post: PostProps) => (post.title + post.body)
      .toLowerCase()
      .includes(state.query.toLowerCase()))
  );
};

export const loadMessage = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(startLoading());

    try {
      const postsFromServer = await getPostsFromServer();

      dispatch(setPosts(postsFromServer));
      dispatch(setMessage('Load Sucsess'));
      dispatch(setIsLoadCompleted());
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
