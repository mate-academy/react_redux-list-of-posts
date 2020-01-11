import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import postsReducer from './posts';
import queryReducer from './query';
import isLoadingReducer from './isLoading';
import isLoadedReducer from './isLoaded';

export const selectPosts = state => state.posts
  .filter(post => post.title.toLowerCase().includes(state.query)
    || post.body.toLowerCase().includes(state.query));
export const selectIsLoading = state => state.isLoading;
export const selectIsSearchError = state => state.isSearchError;
export const selectIsLoaded = state => state.isLoaded;

const rootReducer = combineReducers({
  posts: postsReducer,
  query: queryReducer,
  isLoading: isLoadingReducer,
  isLoaded: isLoadedReducer,
});

export default createStore(rootReducer, {}, applyMiddleware(thunk));
