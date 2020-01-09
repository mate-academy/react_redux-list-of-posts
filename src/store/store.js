import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import queryReducer from './query';
import postsReducer from './posts';
import loadingReducer from './loading';
import errorReducer from './error';
import initializingReducer from './init';

export const getIsLoading = state => state.isLoading;
export const getHasError = state => state.hasError;
export const getIsInitialized = state => state.isInitialized;
export const getPosts = state => state.posts;
export const getQuery = state => state.query;

const initialState = {
  posts: [],
  isLoading: false,
  hasError: false,
  isInitialized: false,
  query: '',
};

const reducer = combineReducers({
  query: queryReducer,
  isLoading: loadingReducer,
  hasError: errorReducer,
  isInitialized: initializingReducer,
  posts: postsReducer,
});

const store = createStore(reducer, initialState, applyMiddleware(thunk));

export default store;
