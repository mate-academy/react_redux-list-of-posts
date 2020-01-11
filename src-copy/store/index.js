import { createStore, combineReducers } from 'redux';
import isLoadedReducer from './isLoaded';
import loadingReducer from './loading';
import postReducer from './post';

const rootReducer = combineReducers({
  isLoaded: isLoadedReducer,
  loading: loadingReducer,
  post: postReducer,
});
const store = createStore(rootReducer);

export default store;
