import { AnyAction } from 'redux';

const COMMENT_NAME = 'COMMENT_NAME';

export const setCommentName = (commentName: string) => ({ type: COMMENT_NAME, commentName});

const reducer = (commentName = '', action: AnyAction) => {
  switch (action.type) {
    case COMMENT_NAME:
      return action.commentName;
    default:
      return commentName;
  }
};

export default reducer;
