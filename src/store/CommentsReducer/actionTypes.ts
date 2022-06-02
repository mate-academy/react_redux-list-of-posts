/* eslint-disable @typescript-eslint/indent */
import { Comment } from '../../types/Comment';

export enum CommentsActionTypes {
  setIsCommentsVisible = 'SET_IS_COMMENTS_VISIBLE',
  setCommentsDeleteTargets = 'SET_IS_DELETE_TARGETS',
  setSelectedPostComments = 'SET_SELECTED_POST_COMMENTS',
  setInputName = 'SET_INPUT_NAME',
  setInputEmail = 'SET_INPUT_EMAIL',
  setInputComment = 'SET_INPUT_COMMENT',
  setIsEmailValid = 'SET_IS_EMAIL_VALID',
  setIsSubmitted = 'SET_IS_SUBMITTED',
  setIsAddCommentLoading = 'SET_IS_ADD_COMMENT_LOADING',
}

export interface SelectedPostComments {
  type: CommentsActionTypes.setSelectedPostComments;
  selectedPostComments: Comment[];
}

export interface IsCommentsVisible {
  type: CommentsActionTypes.setIsCommentsVisible;
  isCommentsVisible: boolean;
}

export interface CommentsDeleteTargets {
  type: CommentsActionTypes.setCommentsDeleteTargets;
  id: number;
  push: boolean;
}

export interface InputName {
  type: CommentsActionTypes.setInputName;
  inputName: string;
}

export interface InputEmail {
  type: CommentsActionTypes.setInputEmail;
  inputEmail: string;
}

export interface InputComment {
  type: CommentsActionTypes.setInputComment,
  inputComment: string,
}

export interface IsEmailValid {
  type: CommentsActionTypes.setIsEmailValid;
  isEmailValid: boolean;
}

export interface IsSubmitted {
  type: CommentsActionTypes.setIsSubmitted;
  isSubmitted: boolean;
}

export interface IsAddCommentLoading {
  type: CommentsActionTypes.setIsAddCommentLoading;
  isAddCommentLoading: boolean;
}

export type CommentsActions = SelectedPostComments
  | IsCommentsVisible
  | CommentsDeleteTargets
  | InputName
  | InputEmail
  | InputComment
  | IsEmailValid
  | IsSubmitted
  | IsAddCommentLoading;
