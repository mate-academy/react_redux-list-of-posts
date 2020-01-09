import { ACTION_TYPES } from './actions';

const {
  LOAD,
  HANDLE_SUCCESS,
  HANDLE_ERROR,
  HANDLE_REMOVE_POST,
  HANDLE_REMOVE_COMMENT,
} = ACTION_TYPES;

export const initialState = {
  loaded: false,
  isLoading: false,
  hasError: false,
  posts: [],
  users: [],
  comments: [],
};

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };

    case HANDLE_SUCCESS:
      return {
        ...state,
        posts: action.payload.posts,
        users: action.payload.users,
        comments: action.payload.comments,
        isLoading: false,
        hasError: false,
        loaded: true,
      };

    case HANDLE_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };

    case HANDLE_REMOVE_POST:
      return {
        ...state,
        posts: [...state.posts]
          .filter(post => post.id !== action.payload),
      };

    case HANDLE_REMOVE_COMMENT:
      return {
        ...state,
        comments: [...state.comments]
          .filter(comment => comment.id !== action.payload),
      };

    default:
      return state;
  }
};
