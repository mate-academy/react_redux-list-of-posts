import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import loadingReducer from './loading';
import postReducer from './posts';
import loadedReducer from './loaded';
import errorReducer from './error';
import filterReducer from './filter';


/**
 * Each concrete reducer will receive all the actions but only its part of the state
 *
 * const rootReducer = (state = {}, action) => ({
 *   loading: loadingReducer(state.loading, action),
 *   message: messageReducer(state.message, action),
 * })
 */
const rootReducer = combineReducers({
  loading: loadingReducer,
  posts: postReducer,
  loaded: loadedReducer,
  error: errorReducer,
  filter: filterReducer,
});

const searchPost = (postsSearch: Post[], termSearch: string) => {
  if (termSearch.length === 0) {
    return postsSearch;
  }

  return postsSearch.filter(post => {
    const bodyNormalize = post.body.toLowerCase();
    const titleNormalize = post.title.toLowerCase();

    return (bodyNormalize + titleNormalize).includes(termSearch.toLowerCase());
  });
};


// We automatically get types returned by concrete reducers
export type RootState = ReturnType<typeof rootReducer>;

// Selectors - a function receiving Redux state and returning some data from it
export const isLoading = (state: RootState) => state.loading;
export const getContent = (state: RootState) => state.posts;
export const getLoaded = (state: RootState) => state.loaded;
export const isError = (state: RootState) => state.error;
export const getFilter = (state: RootState) => state.filter;
export const getVisiblePosts = (state: RootState) => {
  return searchPost(state.posts, state.filter);
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
