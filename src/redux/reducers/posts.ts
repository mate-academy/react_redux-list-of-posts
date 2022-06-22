import { ActionTypes } from '../../types/ActionTypes';
import { CommentType } from '../../types/CommentType';

const initialState = {
  postsList: [],
  activePost: null,
  comments: [],
  details: [],
};

// eslint-disable-next-line
const posts = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.SET_POSTS:
      return {
        ...state,
        postsList: action.payload.postsList,
      };

    case ActionTypes.SET_ACTIVE_POST:
      return {
        ...state,
        activePost: action.payload.activePost,
      };

    case ActionTypes.SET_COMMENTS:
      return {
        ...state,
        comments: action.payload.comments,
      };

    case ActionTypes.DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter((item: CommentType) => (
          item.id !== action.payload.commentId
        )),
      };

    case ActionTypes.ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload.commentData],
      };

    case ActionTypes.SET_DETAILS:
      return {
        ...state,
        details: action.payload.postDetails,
      };

    default:
      return state;
  }
};

export default posts;
