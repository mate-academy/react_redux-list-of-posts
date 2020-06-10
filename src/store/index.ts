import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import loadingReducer from './loading';
import { loadedReducer } from './loaded';
import { postsReducer } from './posts';
import { filterReducer } from './filter';
import { errorReducer } from './error';

const rootReducer = combineReducers({
  posts: postsReducer,
  loading: loadingReducer,
  loaded: loadedReducer,
  filter: filterReducer,
  error: errorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const getLoading = (state: RootState) => state.loading;
export const getLoaded = (state: RootState) => state.loaded;
export const getPosts = (state: RootState) => state.posts;
export const getFilter = (state: RootState) => state.filter;

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
