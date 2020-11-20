import { AnyAction } from 'redux';

const COMMENT_BODY = 'COMMENT_BODY';

export const setCommentBody = (commentBody: string) => ({ type: COMMENT_BODY, commentBody});

const reducer = (commentBody = '', action: AnyAction) => {
  switch (action.type) {
    case COMMENT_BODY:
      return action.commentBody;
    default:
      return commentBody;
  }
};

export default reducer;
