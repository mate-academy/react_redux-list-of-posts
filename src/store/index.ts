import { createStore, combineReducers, Dispatch, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
// import { Dispatch } from 'react';
import { postsReducer } from './postsReducer';
import { commentsReducer } from './commentsReducer';

import loadingReducer, { finishLoading, startLoading } from './loading';
import messageReducer, { setMessage } from './message';
import { fetchMessage } from '../helpers/api';
// import { getPosts } from '../helpers/posts';
// import { Post } from '../types';

// Action types
const SET_LOADING = 'SET_LOADING';

/**
 * Each concrete reducer will receive all the actions but only its part of the state
 *
 * const rootReducer = (state = {}, action) => ({
 *   loading: loadingReducer(state.loading, action),
 *   message: messageReducer(state.message, action),
 * })
 */

// const initialState: RootState = {
//   posts: [],
//   postId: 0,
//   users: [],
//   userId: 0,
//   user: {},
//   loading: false,
//   message: null,
// };

// const postsReducer = (state = initialState, action: AnyAction) => {

// const postsReducer = (state = {}, action: AnyAction) => ({
//   switch (action.type) {
//     case GET_POSTS:
//       return {
//         ...state,
//         todos: [...action.value],
//       }
//       default:
//       return state;
//   }
// });

const rootReducer = combineReducers({
  loading: loadingReducer,
  message: messageReducer,
  postsState: postsReducer,
  commentsState: commentsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// Action creators
export const setLoading = (loading: boolean) => ({ type: SET_LOADING, value: loading });

// Selectors - a function receiving Redux state and returning some data from it
export const isLoading = (state: RootState) => state.loading;
export const getMessage = (state: RootState) => state.message;
export const getUsersList = (state: RootState) => state.postsState.users;
export const getPostsList = (state: RootState) => state.postsState.posts;
export const getSelectedPostId = (state: RootState) => state.postsState.selectedPostId;
export const getPost = (state: RootState) => state.postsState.post;
export const getPostComments = (state: RootState) => state.commentsState.comments;
export const areCommentsUpdated = (state: RootState) => state.commentsState.commentsUpdated;

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

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
