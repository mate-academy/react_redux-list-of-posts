import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import postsReducer from './posts';
import searchQueryReducer from './searchQuery';

export const getPosts = state => state.posts;
export const getSearchQuery = state => state.searchQuery;

const store = createStore(combineReducers({
  posts: postsReducer,
  searchQuery: searchQueryReducer,
}), applyMiddleware(thunk));

export default store;
