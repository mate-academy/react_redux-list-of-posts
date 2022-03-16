import { createStore } from 'redux';
import {
  CHANGE_COMMENTS_VISIBILITY,
  CHANGE_COMMENT_BODY,
  CHANGE_EMAIL,
  CHANGE_NAME,
  CHANGE_POST,
  CHANGE_USER,
  LOAD_COMMENTS,
  LOAD_POSTS,
  LOAD_USERS,
} from './actions';

const initialState: State = {
  posts: [],
  userId: 0,
  users: [],
  postId: 0,
  comments: [],
  newComment: {
    postId: 0,
    name: '',
    email: '',
    body: '',
  },
  isCommentsHidden: false,
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return {
        ...state,
        posts: [...action.payload],
      };

    case CHANGE_USER:
      return {
        ...state,
        userId: action.payload,
      };

    case LOAD_USERS:
      return {
        ...state,
        users: [...action.payload],
      };

    case CHANGE_POST:
      return {
        ...state,
        postId: action.payload,
      };

    case LOAD_COMMENTS:
      return {
        ...state,
        comments: [...action.payload],
      };

    case CHANGE_NAME:
      return {
        ...state,
        newComment: {
          ...state.newComment,
          name: action.payload,
        },
      };

    case CHANGE_EMAIL:
      return {
        ...state,
        newComment: {
          ...state.newComment,
          email: action.payload,
        },
      };

    case CHANGE_COMMENT_BODY:
      return {
        ...state,
        newComment: {
          ...state.newComment,
          body: action.payload,
        },
      };

    case CHANGE_COMMENTS_VISIBILITY:
      return {
        ...state,
        isCommentsHidden: !action.payload,
      };

    default:
      return state;
  }
};

export const store = createStore(reducer);
