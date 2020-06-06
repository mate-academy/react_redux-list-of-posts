import { AnyAction } from 'redux';
import { CommentType } from '../types';
import { LOADING_FINISH } from '.';

// Action types
export const SET_COMMENTS = 'SET_COMMENTS';

// Action creators
export const setComments = (comments: CommentType[]) => ({
  type: SET_COMMENTS,
  comments
});

const reducer = (comments = [], action: AnyAction) => {
  switch (action.type) {
    case SET_COMMENTS:
    case LOADING_FINISH:
      return action.comments;
    default:
      return comments;
  }
};

export default reducer;
