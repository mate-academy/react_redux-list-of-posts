import { CommentType } from '../../../types/CommentType';
import { ActionTypes, PostAction } from './types';

const initialState = {
  postsList: [],
  activePost: null,
  comments: [],
  details: [],
};

const posts = (state = initialState, action: PostAction) => {
  switch (action.type) {
    case ActionTypes.SET_POSTS:
      return {
        ...state,
        postsList: action.payload,
      };

    case ActionTypes.SET_ACTIVE_POST:
      return {
        ...state,
        activePost: action.payload,
      };

    case ActionTypes.SET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };

    case ActionTypes.DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter((item: CommentType) => (
          item.id !== action.payload
        )),
      };

    case ActionTypes.ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };

    case ActionTypes.SET_DETAILS:
      return {
        ...state,
        details: action.payload,
      };

    default:
      return state;
  }
};

export default posts;
