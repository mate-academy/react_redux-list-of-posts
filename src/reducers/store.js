import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import loadingReducer from './LoadingReducer';
import loadedReducer from './LoadedReducer';
import errorReducer from './ErrorReducer';
import postsReducer from './PostsReducer';
import filterReducer from './FilterReducer';

export const getPosts = state => state.posts
  .filter(post => post.title.includes(state.filterQuery)
    || post.body.includes(state.filterQuery));
export const getLoading = state => state;
export const getLoaded = state => state;
export const getError = state => state;

const rootReducer = combineReducers({
  posts: postsReducer,
  loading: loadingReducer,
  loaded: loadedReducer,
  error: errorReducer,
  filterQuery: filterReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
