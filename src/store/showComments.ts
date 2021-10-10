import { AnyAction } from 'redux';
import { Dispatch } from 'react';
import { addPostComment, deletePostComments, getPostComments } from '../api/comments';

const SET_COMMENTS = 'SET_COMMENTS';
const DELETE_COMMENT = 'DELETE_COMMENT';
const ADD_COMMENT = 'ADD_COMMENT';

export const setComments = (postId: number) => (dispatch: Dispatch<any>) => {
  getPostComments(postId)
    .then(receivedFromServerPostComments => {
      dispatch({
        type: SET_COMMENTS,
        payload: receivedFromServerPostComments,
      });
    });
};

export const deleteComment = (commentId: number) => (dispatch: Dispatch<any>) => {
  deletePostComments(commentId)
    .then(() => {
      dispatch({
        type: DELETE_COMMENT,
        payload: commentId,
      });
    });
};

export const addComment = (comment: IComment, onSuccess: any) => (dispatch: Dispatch<any>) => {
  addPostComment(comment)
    .then(() => {
      dispatch({
        type: ADD_COMMENT,
        payload: comment,
      });

      onSuccess();
    });
};

const initialState: CommentsState = {
  comments: [],
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };

    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter((comment: any) => comment.id !== action.payload),
      };

    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };

    default:
      return state;
  }
};

export default reducer;
