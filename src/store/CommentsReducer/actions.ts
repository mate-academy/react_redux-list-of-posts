/* eslint-disable no-debugger */
import { Dispatch } from 'react';
import { AllActions, Thunk } from '..';
import {
  addComment,
  deleteCommentFromServer,
  getPostComments,
} from '../../api/comments';
import { emailValidator } from '../../functions/emailValidator';
import { Comment } from '../../types/Comment';
import {
  CommentsActionTypes,
  CommentsDeleteTargets,
  InputComment,
  InputEmail,
  InputName,
  IsAddCommentLoading,
  IsCommentsVisible,
  IsEmailValid,
  IsSubmitted,
  SelectedPostComments,
} from './actionTypes';

export const setSelectedPostCommentsAction = (
  comments: Comment[],
): SelectedPostComments => {
  return ({
    type: CommentsActionTypes.setSelectedPostComments,
    selectedPostComments: comments,
  });
};

export const setIsCommentsVisibleAction = (
  boolean: boolean,
): IsCommentsVisible => {
  return ({
    type: CommentsActionTypes.setIsCommentsVisible,
    isCommentsVisible: boolean,
  });
};

export const setCommentsDeleteTargetsAction = (
  id: number,
  push: boolean,
): CommentsDeleteTargets => {
  return ({
    type: CommentsActionTypes.setCommentsDeleteTargets,
    id,
    push,
  });
};

export const setInputNameAction = (
  value: string,
): InputName => {
  return ({
    type: CommentsActionTypes.setInputName,
    inputName: value,
  });
};

export const setInputEmailAction = (
  value: string,
): InputEmail => {
  return ({
    type: CommentsActionTypes.setInputEmail,
    inputEmail: value,
  });
};

export const setInputCommentAction = (
  value: string,
): InputComment => {
  return ({
    type: CommentsActionTypes.setInputComment,
    inputComment: value,
  });
};

export const setIsEmailValidAction = (
  value: boolean,
): IsEmailValid => {
  return ({
    type: CommentsActionTypes.setIsEmailValid,
    isEmailValid: value,
  });
};

export const setIsSubmittedAction = (
  value: boolean,
): IsSubmitted => {
  return ({
    type: CommentsActionTypes.setIsSubmitted,
    isSubmitted: value,
  });
};

export const setIsAddCommentLoadingAction = (
  value: boolean,
): IsAddCommentLoading => {
  return ({
    type: CommentsActionTypes.setIsAddCommentLoading,
    isAddCommentLoading: value,
  });
};

export const loadCommentsFromServerAction = (
  selectedPostId: number | null,
  CommentId: number | undefined = undefined,
) => {
  return async (dispatch: Dispatch<AllActions>) => {
    try {
      if (selectedPostId) {
        const currentPostComments = await getPostComments(selectedPostId);

        dispatch(setSelectedPostCommentsAction(currentPostComments));

        if (CommentId) {
          dispatch(setCommentsDeleteTargetsAction(CommentId, false));
        }
      }
    } catch (error) {
      dispatch(setSelectedPostCommentsAction([]));
    }
  };
};

export const deleteCommentAction = (
  CommentId: number,
  selectedPostId: number | null,
) => {
  return async (dispatch: Dispatch<AllActions | Thunk>) => {
    dispatch(setCommentsDeleteTargetsAction(CommentId, true));

    await deleteCommentFromServer(CommentId);
    dispatch(loadCommentsFromServerAction(selectedPostId, CommentId));
  };
};

export const addCommentAction = (
  event: React.FormEvent<HTMLFormElement>,
  inputName: string,
  inputEmail: string,
  inputComment: string,
  selectedPostId: number | null,
) => {
  return async (dispatch: Dispatch<AllActions | Thunk>) => {
    event.preventDefault();
    dispatch(setIsAddCommentLoadingAction(true));
    dispatch(setIsSubmittedAction(true));

    if (!inputName || !inputEmail || !inputComment) {
      dispatch(setIsAddCommentLoadingAction(false));

      return;
    }

    if (!emailValidator(inputEmail)) {
      dispatch(setIsEmailValidAction(false));
      dispatch(setIsAddCommentLoadingAction(false));

      return;
    }

    const newComment: Omit<Comment, 'id'> = {
      postId: selectedPostId || 0,
      name: inputName,
      email: inputEmail,
      body: inputComment,
    };

    await addComment(newComment);
    dispatch(loadCommentsFromServerAction(selectedPostId));

    dispatch(setIsSubmittedAction(false));
    dispatch(setIsAddCommentLoadingAction(false));
    dispatch(setInputNameAction(''));
    dispatch(setInputEmailAction(''));
    dispatch(setInputCommentAction(''));
  };
};
