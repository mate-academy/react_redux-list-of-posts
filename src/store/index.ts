import { createStore } from 'redux';
import { Action, State } from '../react-app-env';
import {
  CHANGE_POST,
  CHANGE_USER,
  LOAD_COMMENTS,
  LOAD_POSTS,
  LOAD_USERS,
} from './actions';

const initialState: State = {
  posts: [],
  post: null,
  user: null,
  comments: [],
  users: [],
  userId: 0,
  postId: 0,
};

export const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return {
        ...state,
        posts: [...action.payload],
      };

    case LOAD_USERS:
      return {
        ...state,
        users: [...action.payload],
      };

    case LOAD_COMMENTS:
      return {
        ...state,
        comments: [...action.payload],
      };

    case CHANGE_USER:
      return {
        ...state,
        userId: action.payload,
      };

    case CHANGE_POST:
      return {
        ...state,
        postId: action.payload,
      };

    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
