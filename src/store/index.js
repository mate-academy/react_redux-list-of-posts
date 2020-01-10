import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import postsReducer from './postsReducer';
import loadingReducer from './loadingReducer';
import searchInputReducer from './searchInputReducer';
import postsLoadedReducer from './postsLoadedReducer';

export const getSearchTerm = state => state.searchTerm;
export const getIsloading = state => state.isLoading;
export const getisLoaded = state => state.postsLoaded;
export const getPostsWithComments = state => state.preparedPosts
  .filter(post => `${post.title} ${post.body}`.toLowerCase()
    .includes(state.searchTerm));

const reducer = combineReducers({
  isLoading: loadingReducer,
  postsLoaded: postsLoadedReducer,
  preparedPosts: postsReducer,
  searchTerm: searchInputReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
