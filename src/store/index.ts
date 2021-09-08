import { createStore, combineReducers, Dispatch, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { postsReducer } from './postsReducer';
import { commentsReducer } from './commentsReducer';

import loadingReducer, { finishLoading, startLoading } from './loading';
import messageReducer, { setMessage } from './message';
import { fetchMessage } from '../helpers/api';

// Action types
const SET_LOADING = 'SET_LOADING';

const rootReducer = combineReducers({
  loading: loadingReducer,
  message: messageReducer,
  postsState: postsReducer,
  commentsState: commentsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// Action creators
export const setLoading = (loading: boolean) => ({ type: SET_LOADING, value: loading });

// Selectors
export const isLoading = (state: RootState) => state.loading;
export const getMessage = (state: RootState) => state.message;
export const getUsersList = (state: RootState) => state.postsState.users;
export const getPostsList = (state: RootState) => state.postsState.posts;
export const getSelectedPostId = (state: RootState) => state.postsState.selectedPostId;
export const getPost = (state: RootState) => state.postsState.post;
export const getPostComments = (state: RootState) => state.commentsState.comments;
export const getPostCommentsEdit = (state: RootState) => state.commentsState.commentsEdit;
export const getPostCommentEdit = (state: RootState) => state.commentsState.commentEdit;
export const arePostCommentsHidden = (state: RootState) => state.commentsState.commentsHidden;
export const arePostCommentsUpdated = (state: RootState) => state.commentsState.commentsUpdated;

/**
 * Thunk
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
