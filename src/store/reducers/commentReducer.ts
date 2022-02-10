import { Dispatch } from 'react';
import { deleteCommentInPost, getPostComments, addCommentToPost } from '../../api/comments';
import { CommentAction, CommentActionTypes, CommentState } from '../types/comment';

const initialState: CommentState = {
  comments: [],
  isLoading: false,
};

export const commentReducer = (state = initialState, action: CommentAction) => {
  switch (action.type) {
    case CommentActionTypes.LOADING_COMMENTS:
      return { ...state, isLoading: true };
    case CommentActionTypes.LOADING_COMMENTS_SUCCESS:
      return { ...state, isLoading: false, comments: action.payload };
    case CommentActionTypes.DELETE_COMMENT:
      return {
        ...state,
        comments: [...state.comments.filter(comment => comment.id !== action.payload)],
      };
    case CommentActionTypes.ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    default:
      return state;
  }
};

export const loadComments = (postId: number) => {
  return async (dispatch: Dispatch<CommentAction>) => {
    dispatch({ type: CommentActionTypes.LOADING_COMMENTS });
    const comments = await getPostComments(postId);

    dispatch({ type: CommentActionTypes.LOADING_COMMENTS_SUCCESS, payload: comments });
  };
};

export const deleteComment = (commentId: number) => {
  return async (dispatch: Dispatch<CommentAction>) => {
    await deleteCommentInPost(commentId);
    dispatch({ type: CommentActionTypes.DELETE_COMMENT, payload: commentId });
  };
};

export const addComment = (newComment: NewComment) => {
  return async (dispatch: Dispatch<CommentAction>) => {
    const comment = await addCommentToPost(newComment);

    dispatch({ type: CommentActionTypes.ADD_COMMENT, payload: comment });
  };
};
