import { AnyAction } from 'redux';

const COMMENT_EMAIL = 'COMMENT_EMAIL';

export const setCommentEmail = (commentEmail: string) => ({ type: COMMENT_EMAIL, commentEmail});

const reducer = (commentEmail = '', action: AnyAction) => {
  switch (action.type) {
    case COMMENT_EMAIL:
      return action.commentEmail;
    default:
      return commentEmail;
  }
};

export default reducer;
