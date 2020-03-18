import { createStore, AnyAction, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  SET_IS_LOADING,
  SET_IS_LOADED,
  SET_POSTS,
  SET_SEARCH_VALUE,
  SET_HAS_ERROR,
  DELETE_POST,
  DELETE_COMMENT,
} from './constants';
import { PreparedPost, CommentInterface } from '../types';

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

    case DELETE_POST:
      return {
        ...state,
        posts: (state.posts as PreparedPost[]).filter(post => post.id !== action.id),
      };

    case DELETE_COMMENT:
      return {
        ...state,
        posts: (state.posts as PreparedPost[]).map((post: PreparedPost) => ({
          ...post,
          comments: (post.comments as CommentInterface[])
            .filter(comment => comment.id !== action.id),
        })),
      };

    default:
      return state;
  }
}

export const store = createStore(reduser, applyMiddleware(thunk));
