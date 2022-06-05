import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';

import loadingReducer, { finishLoading, startLoading } from './loading';
import messageReducer, { setMessage } from './message';
import userReducer from './user';
import posIdtReducer from './postId';
import postsReducer, { setPosts } from './posts';
import postReducer, { setPost } from './post';
import { fetchMessage } from '../helpers/api';
import { fetchPost, fetchPosts } from '../api/posts';
// import { setPost } from './post';

/**
 * Each concrete reducer will receive all the actions but only its part of the state
 *
 * const rootReducer = (state = {}, action) => ({
 *   loading: loadingReducer(state.loading, action),
 *   message: messageReducer(state.message, action),
 * })
 */
const rootReducer = combineReducers({
  loading: loadingReducer,
  message: messageReducer,
  userId: userReducer,
  postId: posIdtReducer,
  posts: postsReducer,
  post: postReducer,
});

// We automatically get types returned by concrete reducers
export type RootState = ReturnType<typeof rootReducer>;

/**
 * Thunk - is a function that should be used as a normal action creator
 *
 * dispatch(loadMessage())
 */
export const loadMessage = () => {
  // inner function is an action handled by Redux Thunk
  return async (dispatch: Dispatch<any>) => {
    dispatch(startLoading());

    try {
      const message = await fetchMessage();

      dispatch(setMessage(message));
    } catch (error) {
      dispatch(setMessage('Error occurred when loading data'));
    }

    dispatch(finishLoading());
  };
};

export const loadPosts = (userId: number) => {
  // inner function is an action handled by Redux Thunk
  return async (dispatch: Dispatch<any>) => {
    dispatch(startLoading());

    try {
      const posts = await fetchPosts(userId);

      dispatch(setPosts(posts));
    } catch (error) {
      dispatch(setPosts([]));
      dispatch(setMessage('Error occurred when loading data'));
    }

    dispatch(finishLoading());
  };
};

export const loadPost = (postId: number) => {
  // inner function is an action handled by Redux Thunk
  return async (dispatch: Dispatch<any>) => {
    if (postId) {
      try {
        dispatch(startLoading());
        const post = await fetchPost(postId);

        dispatch(setPost(post));
      } catch (error) {
        dispatch(setMessage('Error occurred when loading post'));
      } finally {
        dispatch(finishLoading());
      }
    }
  };
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
