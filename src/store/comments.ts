import { AnyAction, Dispatch } from 'redux';
import { deleteComment, getComments } from '../api/comments';

const COMMENTS = 'COMMENTS';

export const actions = {
  setComments: (comments: Comment[]) => ({ type: COMMENTS, comments }),
  loadComments: (id: number) => (dispatch: Dispatch<AnyAction>) => {
    getComments(id).then((res) => dispatch(actions.setComments(res)));
  },
  deleteComment: (id: number, postId: number) => (
    async (dispatch: Dispatch<AnyAction>) => {
      await deleteComment(id);
      getComments(postId).then((res) => dispatch(actions.setComments(res)));
    }),
};

export const commentsReducer = (comments = [], action: AnyAction) => {
  switch (action.type) {
    case COMMENTS:
      return action.comments;
    default:
      return comments;
  }
};
