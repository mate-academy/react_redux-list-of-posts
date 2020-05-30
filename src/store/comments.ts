import { AnyAction } from 'redux';

const SET_COMMENTS = 'SET_COMMENTS';
const DELETE_COMMENT = 'DELETE_COMMENT';

export const setComments = (comments: Comment[]) => ({
  type: SET_COMMENTS,
  comments,
});

export const deleteComment = (commentId: number) => ({
  type: DELETE_COMMENT,
  commentId,
});

const reducer = (comments = [], action: AnyAction) => {
  switch (action.type) {
    case SET_COMMENTS:
      return action.comments;

    case DELETE_COMMENT:
      return [...comments].filter((comment: Comment) => comment.id !== action.commentId);

    default:
      return comments;
  }
};

export default reducer;
