import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';

import loadingReducer, { finishLoading, startLoading } from './loading';
import messageReducer, { setMessage } from './message';
import postsReducer, { setPosts } from './postsReducer';
import queryReducer from './query';
import { Post, User, Comment } from '../components/Interfaces';
import { getData } from '../helpers/api';

const rootReducer = combineReducers({
  loading: loadingReducer,
  message: messageReducer,
  posts: postsReducer,
  query: queryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const isLoading = (state: RootState) => state.loading;
export const getMessage = (state: RootState) => state.message;
export const getPosts = (state: RootState) => state.posts;
export const getQuery = (state: RootState) => state.query;

const API = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/';

export const loadPosts = () => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(startLoading());

    try {
      const posts: Post[] = await getData(`${API}posts.json`);
      const users: User[] = await getData(`${API}users.json`);
      const comments: Comment[] = await getData(`${API}comments.json`);

      dispatch(setPosts({
        posts,
        users,
        comments,
      }));
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
