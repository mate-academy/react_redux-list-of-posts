import {
  LOAD_COMMENTS,
  CREATE_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
} from './types';
import { Comment } from '../Types/Comment';

const initialState = {
  comments: [] as Comment[],
};

const updateFunction = (state: any, action: any) => {
  const itemIndex = state.comments.findIndex((res: Comment) => res.id === action.data.id);

  const updateComments = [
    ...state.comments.slice(0, itemIndex),
    action.data,
    ...state.comments.slice(itemIndex + 1),
  ];

  return updateComments;
};

export const commentsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOAD_COMMENTS:
      return {
        ...state,
        comments: action.data,
      };

    case CREATE_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.data],
      };

    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter((comment: any) => comment.id !== action.data),
      };

    case UPDATE_COMMENT:
      return {
        ...state,
        comments: updateFunction(state, action),
      };
    default:
      return state;
  }
};
