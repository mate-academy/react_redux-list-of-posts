import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';

import loadingReducer, { finishLoading, startLoading } from './loading';
import messageReducer, { setMessage } from './message';
import userReducer from './user';
import { fetchMessage } from '../helpers/api';
// import { useSelector } from 'react-redux';
// import { fetchPosts } from '../api/posts';
// import { useSelector } from 'react-redux';

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
      // dispatch(setUserId(user));
    } catch (error) {
      dispatch(setMessage('Error occurred when loading data'));
      // dispatch(setUserId('0'));
    }

    dispatch(finishLoading());
  };
};

export const loadPosts = () => {
  // inner function is an action handled by Redux Thunk
  return async (dispatch: Dispatch<any>) => {
    dispatch(startLoading());

    // const userId = useSelector(getUserId);

    // try {
    //   const posts = await fetchPosts(userId);

    //   dispatch(setPosts(posts));
    // } catch (error) {
    //   dispatch(setPosts([]));
    // }

    dispatch(finishLoading());
  };
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
