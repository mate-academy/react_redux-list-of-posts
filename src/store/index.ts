import { createStore } from 'redux';
import { Action, State } from '../react-app-env';
import {
  SET_POSTS,
  ADD_POST,
  SET_USER_ID,
  SET_ALL_USERS,
  SET_COMMENT_LIST,
  SET_SELECT_POST,
  SET_SINGLE_SELECT_POST,
  SET_NEED_FOR_UPDATE,
} from './actions';

const initialState : State = {
  posts: [],
  selectedPostId: null,
  currentUserId: 0,
  allUsers: [],
  commentsList: [],
  selectedPost: null,
  needToUpdate: false,
};

const reducer = (state = initialState, action : Action) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: [...action.payload],
      };
    case ADD_POST:
      return {
        ...state,
        todos: [...state.posts, action.payload],
      };

    case SET_USER_ID:
      return {
        ...state,
        currentUserId: action.payload,
      };
    case SET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };

    case SET_COMMENT_LIST:
      return {
        ...state,
        commentsList: action.payload,
      };
    case SET_SELECT_POST:
      return {
        ...state,
        selectedPostId: action.payload,
      };

    case SET_SINGLE_SELECT_POST:
      return {
        ...state,
        selectedPost: action.payload,
      };

    case SET_NEED_FOR_UPDATE:
      return {
        ...state,
        needToUpdate: action.payload,
      };

    default:
      return state;
  }
};

export const store = createStore(reducer);
