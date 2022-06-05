import { AnyAction } from 'redux';
import { Comment } from '../types/Comment';

// Action types
const SET_COMMENTS = 'SET_COMMENTS';

// Action creators
export const setComments
  = (comments: Comment[] | null) => ({ type: SET_COMMENTS, comments });

const reducer = (comments = [], action: AnyAction) => {
  switch (action.type) {
    case SET_COMMENTS:
      return action.comments;

    default:
      return comments;
  }
};

export default reducer;
