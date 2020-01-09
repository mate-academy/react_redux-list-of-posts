import { createStore, combineReducers } from 'redux';
import postsReducer from './posts';
import isLoadedReducer from './isLoaded';
import loadingReducer from './loading';
import originalPostReducer from './originalPost';

const rootReducer = combineReducers({
  posts: postsReducer,
  isLoaded: isLoadedReducer,
  loading: loadingReducer,
  originalPost: originalPostReducer,
});
const store = createStore(rootReducer);

export default store;
