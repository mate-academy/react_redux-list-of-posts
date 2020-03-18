import { AnyAction } from 'redux';
import { type } from '../actions';

const dataState: DataState = {
  posts: [],
  users: [],
  comments: [],
};

export const dataReducer = (state = dataState, action: AnyAction): DataState => {
  switch (action.type) {
    case type.SET_POSTS:
      return {
        ...state,
        posts: action.posts,
      };

    case type.SET_USERS:
      return {
        ...state,
        users: action.users,
      };

    case type.SET_COMMENTS:
      return {
        ...state,
        comments: action.comments,
      };

    case type.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.id),
      };

    case type.DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== action.id),
      };

    default:
      return state;
  }
};
