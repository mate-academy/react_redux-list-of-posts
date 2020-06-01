import { AnyAction } from 'redux';
import { CommentType } from '../types';

// Action types
export const SET_COMMENTS = 'SET_COMMENTS';

// Action creators
export const setCommentsCreator = (comments: CommentType[]) => ({ type: SET_COMMENTS, comments });

const reducer = (comments = [], action: AnyAction) => {
  switch (action.type) {
    case SET_COMMENTS:
      return action.comments;
    default:
      return comments;
  }
};

export default reducer;
