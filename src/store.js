import { createStore, combineReducers } from 'redux';
import loadingReducer from './LoadingReducer';
import postsReducer from './PostsReducer';

export const getPosts = state => state.posts;
export const getLoading = state => state.isLoading;
export const getLoaded = state => state.loaded;
export const getError = state => state.error;
export const getFilteredPosts = state => state.filteredPosts;

const rootReducer = combineReducers({
  posts: postsReducer,
  loading: loadingReducer,
});

const store = createStore(rootReducer);

export default store;
