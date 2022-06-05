import { Comment } from '../types/Comment';

// Action types
const SET_COMMENTS = 'SET_COMMENTS';

// Action creators
export type SetCommentsAction = {
  type: string,
  comments: Comment[],
};

export const setComments
  = (comments: Comment[] | null) => ({ type: SET_COMMENTS, comments });

const reducer = (comments = [], action: SetCommentsAction) => {
  switch (action.type) {
    case SET_COMMENTS:
      return action.comments;

    default:
      return comments;
  }
};

export default reducer;
