import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import postsReducer from './postsReducer';
import loadingReducer from './loadingReducer';
import searchInputReducer from './searchInputReducer';
import showingReducer from './showingReducer';

export const getIsloading = state => state.isLoading;
export const getisShown = state => state.isShown;
export const getPostsWithComments = state => state.preparedPosts
  .filter(post => post.title.toLowerCase()
    .includes(state.searchTerm)
|| post.body.toLowerCase()
  .includes(state.searchTerm));

const reducer = combineReducers({
  isLoading: loadingReducer,
  isShown: showingReducer,
  preparedPosts: postsReducer,
  searchTerm: searchInputReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
