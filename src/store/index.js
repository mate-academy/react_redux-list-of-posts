import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import postsReducer from './posts';
import searchQueryReducer from './searchQuery';
import isLoadingReducer from './isLoading';

export const getPosts = state => state.posts;
export const getSearchQuery = state => state.searchQuery;
export const getIsLoading = state => state.isLoading;

const store = createStore(combineReducers({
  posts: postsReducer,
  searchQuery: searchQueryReducer,
  isLoading: isLoadingReducer,
}), applyMiddleware(thunk));

export default store;
