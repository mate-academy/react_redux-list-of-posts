import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { deleteComment, getComments } from '../api/comments';

const COMMENTS = 'COMMENTS';

export const selectors = {
  getComments: (state: RootState) => state.comments,
};

export const actions = {
  setComments: (comments: Comment[]) => ({ type: COMMENTS, comments }),
  loadComments: (id: number) => (dispatch: Dispatch<unknown>) => {
    getComments(id).then((res) => dispatch(actions.setComments(res)));
  },
  deleteComment: (id: number, postId: number) => (
    async (dispatch: Dispatch<unknown>) => {
      await deleteComment(id);
      getComments(postId).then((res) => dispatch(actions.setComments(res)));
    }),
};

export const commentsReducer = (state = {
  comments: [],
}, action: AnyAction) => {
  switch (action.type) {
    case COMMENTS:
      return {
        ...state,
        comments: action.comments,
      };
    default:
      return state;
  }
};
