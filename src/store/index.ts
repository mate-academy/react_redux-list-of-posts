import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';

import loadingReducer, { finishLoading, startLoading } from './loading';
import loadedReducer, { isLoaded, notLoaded } from './loaded';
import messageReducer, { setMessage } from './message';
import postsReducer, { setPosts } from './posts';
import sortedPostsReducer from './sortedPosts';
import { getPost, getUsers, getComments } from '../helpers/api';

const rootReducer = combineReducers({
  loading: loadingReducer,
  message: messageReducer,
  posts: postsReducer,
  sortedPosts: sortedPostsReducer,
  loaded: loadedReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const isLoading = (state: RootState) => state.loading;
export const getMessage = (state: RootState) => state.message;
export const getPosts = (state: RootState) => state.posts;
export const getSortedPosts = (state: RootState) => state.sortedPosts;
export const getIsLoaded = (state: RootState) => state.loaded;

export const loadMessage = () => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(startLoading());

    try {
      const postFromServer = await getPost();
      const userFromServer = await getUsers();
      const commentsFromServer = await getComments();

      const preperedListOfPosts = postFromServer.map(item => ({
        ...item,
        user: userFromServer.find(itemId => (itemId.id === item.userId)),
        comments: commentsFromServer.filter(postId => (postId.postId === item.userId)),
      }));

      dispatch(setPosts(preperedListOfPosts));
      dispatch(setMessage('Loaded'));
      dispatch(isLoaded());
    } catch (error) {
      dispatch(setMessage('Error occurred when loading data'));
      dispatch(notLoaded());
    }

    dispatch(finishLoading());
  };
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
