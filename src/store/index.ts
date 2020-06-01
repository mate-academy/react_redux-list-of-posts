import { createStore, combineReducers } from 'redux';
import loadingReducer from './loading';
import postReducer from './posts';
import loadedReducer from './loaded';

const rootReducer = combineReducers({
  loading: loadingReducer,
  posts: postReducer,
  loaded: loadedReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const isLoading = (state: RootState) => state.loading;
export const getPosts = (state: RootState) => state.posts;
export const isLoaded = (state: RootState) => state.loaded;

const store = createStore(
  rootReducer,
);

export default store;
