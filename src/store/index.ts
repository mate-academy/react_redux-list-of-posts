import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';

import loadingReducer, { finishLoading, startLoading } from './loading';
import postsReducer, { loadSuccess } from './posts';
import errorReducer, { loadError } from './errorMessage';
import filterReducer from './filterQuery';
import { getPostsData } from '../helpers/api';

const rootReducer = combineReducers({
  posts: postsReducer,
  isLoading: loadingReducer,
  errorMessage: errorReducer,
  filterQuery: filterReducer,
});

// We automatically get types returned by concrete reducers
export type RootState = ReturnType<typeof rootReducer>;

// Selectors - a function receiving Redux state and returning some data from it
export const getPosts = (state: RootState) => state.posts;
export const getLoadingStatus = (state: RootState) => state.isLoading;
export const getErrorMessage = (state: RootState) => state.errorMessage;
export const getFilterQuery = (state: RootState) => state.filterQuery;

/**
 * Thunk - is a function that should be used as a normal action creator
 *
 * dispatch(loadPosts())
 */
export const loadPosts = () => {
  // inner function is an action handled by Redux Thunk
  return async (dispatch: Dispatch<any>) => {
    dispatch(startLoading());

    return getPostsData()
      .then(posts => dispatch(loadSuccess(posts)))
      .catch(() => dispatch(loadError('Error occurred when loading data')))
      .finally(() => dispatch(finishLoading()));
  };
};

const initialState: RootState = {
  posts: [],
  isLoading: false,
  errorMessage: '',
  filterQuery: '',
};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
