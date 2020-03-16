import { AnyAction } from 'redux';
import { SET_COMMENTS, REMOVE_COMMENT } from './actionTypes';
import { CommentType } from '../utils/interfaces';

export const commentsReducer = (state = [], action: AnyAction) => {
  switch (action.type) {
    case SET_COMMENTS:
      return action.comments;

    case REMOVE_COMMENT:
      return state.map((comment: CommentType) => {
        if (comment.id === action.payload.id && comment.postId === action.payload.postId) {
          return {
            ...comment,
            id: 999,
          };
        }

        return {
          ...comment,
        };
      }).filter((comment: CommentType) => comment.id !== 999);

    default:
      return state;
  }
};
