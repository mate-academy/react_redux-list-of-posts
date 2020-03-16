import { createStore, AnyAction } from 'redux';
import {
  SET_IS_LOADING,
  SET_IS_LOADED,
  SET_POSTS,
  SET_SEARCH_VALUE,
  SET_HAS_ERROR,
} from './constants';
import { PreparedPost } from '../types';

export interface State {
  isLoading: boolean;
  isLoaded: boolean;
  hasError: boolean;
  posts: PreparedPost[] | [];
  searchValue: string;
}

const initialState = {
  isLoading: false,
  isLoaded: false,
  hasError: false,
  posts: [],
  searchValue: '',
};


function reduser(state = initialState, action: AnyAction) {
  switch (action.type) {
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    case SET_IS_LOADED:
      return {
        ...state,
        isLoaded: action.isLoaded,
      };

    case SET_POSTS:
      return {
        ...state,
        posts: action.posts,
      };

    case SET_SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.searchValue,
      };

    case SET_HAS_ERROR:
      return {
        ...state,
        hasError: action.hasError,
      };

    default:
      return state;
  }
}

export const store = createStore(reduser);
