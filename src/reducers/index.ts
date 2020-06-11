import { combineReducers } from 'redux';
import loadingReducer from './loading';
import queryReducer from './query';
import postsReducer from './posts';

// Selectors
export const getLoading = (state: RootState) => state.loading;
export const getPosts = (state: RootState) => state.posts;
export const getQuery = (state: RootState) => state.query;


export const getVisiblePosts = (state: RootState) => {
  return state.posts
    .filter(post => post.title.includes(state.query));
};


export const rootReducer = combineReducers({
  loading: loadingReducer,
  posts: postsReducer,
  query: queryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
