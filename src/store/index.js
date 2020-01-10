import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createSelector } from 'reselect';
import thunk from 'redux-thunk';

import dataLoadingReducer from './dataLoadingReducer';
import queryReducer from './queryReducer';

export const getIsLoaded = state => state.dataLoading.isLoaded;
export const getIsLoading = state => state.dataLoading.isLoading;
export const getHasError = state => state.dataLoading.hasError;
export const getQuery = state => state.query;
export const getPosts = createSelector(
  [
    state => state.dataLoading.posts,
    getQuery,
  ],

  (posts, query) => (
    posts.filter(
      ({ title, body }) => (title + body).toLowerCase().includes(query)
    )
  )
);

const reducer = combineReducers({
  dataLoading: dataLoadingReducer,
  query: queryReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
