import { AnyAction } from 'redux';
import { State } from '../constants';
import { ActionTypes } from './actionTypes';

export const initialState: State = {
  posts: [],
  isLoading: false,
  query: '',
  error: false,
};

export const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionTypes.SET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };

    case ActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case ActionTypes.SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };

    case ActionTypes.DELETE_POST:
      return {
        ...state,
        posts: [...state.posts].filter(item => item.id !== action.payload),
      };

    case ActionTypes.DELETE_COMMENT:
      return {
        ...state,
        posts: [...state.posts].map(post => ({
          ...post,
          comments: [...post.comments].filter(item => item.id !== action.payload),
        })),
      };

    default:
      return state;
  }
};
