import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import loadingReducer from './loading';
import postsReducer from './posts';
import queryReducer from './query';

// Selectors - a function receiving Redux state and returning some data from it
export const isLoading = (state: RootState) => state.loading;
export const getPosts = (state: RootState) => state.posts;
export const getQuery = (state: RootState) => state.query;

//Initial state

// rootReducer - this function is called after dispatching an action
const rootReducer = combineReducers({
  loading: loadingReducer,
  posts: postsReducer,
  query: queryReducer,
})

export type RootState = ReturnType<typeof rootReducer>;

// The `store` should be passed to the <Provider store={store}> in `/src/index.tsx`
const store = createStore(
  rootReducer,
  composeWithDevTools() // allows you to use http://extension.remotedev.io/
);

export default store;
