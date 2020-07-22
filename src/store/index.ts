import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';

import { findAuthor, findComments } from '../helpers/findData';
import loadingReducer, { finishLoading, startLoading } from './loading';
import messageReducer, { setMessage } from './message';
import postsReducer, { setPostsList } from './posts';
import filterOptionReducer from './filterOption';

import {
  fetchData, URLComments, URLUsers, URLPosts,
} from '../helpers/api';
import {
  Comment, PostFromServer, User, Post,
} from '../interfaces/interfaces';

const rootReducer = combineReducers({
  loading: loadingReducer,
  message: messageReducer,
  posts: postsReducer,
  option: filterOptionReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const getPosts = (state: RootState) => state.posts;
export const isLoading = (state: RootState) => state.loading;
export const getMessage = (state: RootState) => state.message;
export const getFilterOption = (state: RootState) => state.option;

export const loadMessage = () => (async (dispatch: Dispatch<any>) => {
  dispatch(startLoading());

  try {
    const users = await fetchData<User>(URLUsers);
    const posts = await fetchData<PostFromServer >(URLPosts);
    const comments = await fetchData<Comment>(URLComments);

    const preparedPosts: Post[] = posts.map((post) => {
      const [author, email, address] = findAuthor(post.userId, users);

      return {
        ...post,
        author,
        email,
        address,
        comments: findComments(post.id, comments),
      };
    });

    dispatch(setPostsList(preparedPosts));
  } catch (error) {
    dispatch(setMessage('Error occurred when loading data'));
  }

  dispatch(finishLoading());
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
