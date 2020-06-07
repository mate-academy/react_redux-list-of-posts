import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import loadingReducer from './loading';
import errorsReducer from './errors';
import queryReducer from './query';
import postsReducer from './posts';
// import commentReducer from './comment';

export type RootState = {
  posts: [];
  isLoading: boolean;
  hasErrors: boolean;
  query: string;
};

const rootReducer = combineReducers({
  posts: postsReducer,
  isLoading: loadingReducer,
  hasErrors: errorsReducer,
  query: queryReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(),
);

export default store;
