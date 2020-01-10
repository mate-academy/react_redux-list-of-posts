import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import isLoadingReducer from './loading';
import postsReducer from './posts';
import setQueryReducer from './search';

export const getIsLoading = state => state.isLoading;
export const getPosts = state => state.posts;
export const getQuery = state => state.query;

const rootReducer = combineReducers({
  posts: postsReducer,
  isLoading: isLoadingReducer,
  query: setQueryReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
