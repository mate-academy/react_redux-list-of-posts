import { createStore } from 'redux';
import {
  LOAD_COMMENTS,
  LOAD_POST,
  LOAD_POSTS,
  SET_POST_ID,
  SET_SELECTED_POST,
} from './actions';

const initialState : State = {
  posts: [],
  post: null,
  postId: 0,
  comments: [],
  selectedPost: null,
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return {
        ...state,
        posts: [...action.payload],
      };
    case LOAD_POST:
      return {
        ...state,
        post: { ...action.payload },
      };
    case SET_POST_ID:
      return {
        ...state,
        postId: action.payload,
      };
    case LOAD_COMMENTS:
      return {
        ...state,
        comments: [...action.payload],
      };
    case SET_SELECTED_POST:
      return {
        ...state,
        selectedPost: action.payload,
      };
    default:
      return state;
  }
};

export const store = createStore(reducer);
