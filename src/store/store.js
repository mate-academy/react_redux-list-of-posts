import { createStore, applyMiddleware, combineReducers } from 'redux';

import thunk from 'redux-thunk';

import {
  queryReducer,
  errorReducer,
  initReducer,
  loadingReducer,
  postListReducer,
} from './reducers';

export const getPosts = state => state.combineData;
export const getStatusLoading = state => state.isLoading;
export const getError = state => state.hasError;
export const getStatusIsInit = state => state.isInit;
export const getSearchQuery = state => state.query;

const initialState = {
  combineData: [],
  isLoading: false,
  hasError: false,
  isInit: false,
  query: '',
};

const rootReducer = combineReducers({
  combineData: postListReducer,
  isLoading: loadingReducer,
  hasError: errorReducer,
  isInit: initReducer,
  query: queryReducer,

});

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk),
);

export default store;
