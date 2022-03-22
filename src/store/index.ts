import { createStore } from 'redux';
import {
  LOAD_POSTS,
  LOAD_POST_COMMENTS,
  LOAD_POST_DETAILS,
  LOAD_USERS,
} from './actions';

const initialState: State = {
  posts: [],
  users: [],
  postDetails: null,
  postComments: [],
};

const reducer = (state = initialState, action: Action) => {
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

    case LOAD_POST_DETAILS:
      return {
        ...state,
        postDetails: { ...action.payload },
      };

    case LOAD_POST_COMMENTS:
      return {
        ...state,
        postComments: [...action.payload],
      };

    default:
      return state;
  }
};

export const store = createStore(reducer);
