import { AnyAction } from 'redux';

const COMMENT_BODY = 'COMMENT_BODY';
const COMMENT_EMAIL = 'COMMENT_EMAIL';
const COMMENT_NAME = 'COMMENT_NAME';
const RESET_COMMENT = 'RESET_COMMENT';

export const setCommentBody = (commentBody: string) => ({ type: COMMENT_BODY, commentBody });
export const setCommentEmail = (commentEmail: string) => ({ type: COMMENT_EMAIL, commentEmail });
export const setCommentName = (commentName: string) => ({ type: COMMENT_NAME, commentName });

export const resetComment = () => ({ type: RESET_COMMENT });

const reducer = (commentFields = {commentBody: '', commentEmail: '', commentName: ''}, action: AnyAction) => {
  switch (action.type) {
    case COMMENT_BODY:
      return {
        ...commentFields,
        commentBody: action.commentBody,
      };
    case COMMENT_EMAIL:
      return {
        ...commentFields,
        commentEmail: action.commentEmail,
      };
    case COMMENT_NAME:
      return {
        ...commentFields,
        commentName: action.commentName,
      };
    case RESET_COMMENT:
      return {
        commentBody: '',
        commentEmail: '',
        commentName: '',
      }

    default:
      return commentFields;
  }
};

export default reducer;
