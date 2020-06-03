import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';

import loadingReducer, { finishLoading, startLoading } from './loading';
import postsReducer, { setPosts } from './posts';
import errorReducer, { setError } from './error';
import queryReducer from './search';
import * as api from '../helpers/api';

const rootReducer = combineReducers({
  loading: loadingReducer,
  posts: postsReducer,
  errorMessage: errorReducer,
  query: queryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const getIsLoading = (state: RootState) => state.loading;
export const getPosts = (state: RootState) => state.posts;
export const getErrorMessage = (state: RootState) => state.errorMessage;
export const getSearchQuery = (state: RootState) => state.query;

export const loadPosts = () => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(startLoading());
    dispatch(setError(''));

    Promise.all([api.fetchPosts(), api.fetchUsers(), api.fetchComments()])
      .then(([postsFromServer, usersFromServer, commentsFromServer]) => {
        const preparedPosts = postsFromServer.map(post => {
          return {
            ...post,
            user: usersFromServer.find(user => user.id === post.userId) || [],
            comments: commentsFromServer.filter(comment => post.id === comment.postId) || [],
          };
        });

        dispatch(setPosts(preparedPosts as Post[]));
      })
      .catch(e => {
        dispatch(setError(e.message));
      })
      .finally(() => {
        dispatch(finishLoading());
      });
  };
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
