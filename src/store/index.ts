import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';

import loadingReducer, { finishLoading, startLoading } from './loading';
import loadedReducer, { setLoaded } from './loaded';
import errordReducer, { setErrorMessage } from './error';
import postReducer, { setPosts } from './posts';
import userReducer, { setUsers } from './users';
import commentReducer, { setComments } from './comments';
import { getData } from '../helpers/api';

const rootReducer = combineReducers({
  loading: loadingReducer,
  loaded: loadedReducer,
  errorMessage: errordReducer,
  posts: postReducer,
  users: userReducer,
  comments: commentReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const isLoading = (state: RootState) => state.loading;
export const isLoaded = (state: RootState) => state.loaded;
export const getError = (state: RootState) => state.errorMessage;
export const getPosts = (state: RootState) => state.posts;
export const getUsers = (state: RootState) => state.users;
export const getComments = (state: RootState) => state.comments;

export const loadPosts = () => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(startLoading());

    try {
      const [posts, users, comments] = await Promise.all([
        getData<PostFromServer>('posts.json'),
        getData<User>('users.json'),
        getData<Comment>('comments.json'),
      ]);

      dispatch(setPosts(posts));
      dispatch(setUsers(users));
      dispatch(setComments(comments));
      dispatch(setLoaded());
    } catch (error) {
      dispatch(setErrorMessage(`Error occurred when loading data: ${error}`));
    }

    dispatch(finishLoading());
  };
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
