import { Reducer } from 'react';
import { Comment } from '../../types/Comment';

import {
  CommentsActionTypes,
  CommentsActions,
} from './actionTypes';

export type CommentsState = {
  selectedPostComments: Comment[],
  isCommentsVisible: boolean,
  commentsDeleteTargets: number[],
  inputName: string,
  inputEmail: string,
  inputComment: string,
  isEmailValid: boolean,
  isSubmitted: boolean,
  isAddCommentLoading: boolean,
};

const defaultState: CommentsState = {
  selectedPostComments: [],
  isCommentsVisible: true,
  commentsDeleteTargets: [],
  inputName: '',
  inputEmail: '',
  inputComment: '',
  isEmailValid: true,
  isSubmitted: false,
  isAddCommentLoading: false,
};

export const CommentsReducer: Reducer<CommentsState, CommentsActions> = (
  state = defaultState,
  action: CommentsActions,
) => {
  switch (action.type) {
    case CommentsActionTypes.setSelectedPostComments:
      return ({
        ...state,
        selectedPostComments: [...action.selectedPostComments],
      });

    case CommentsActionTypes.setIsCommentsVisible:
      return ({
        ...state,
        isCommentsVisible: action.isCommentsVisible,
      });

    case CommentsActionTypes.setCommentsDeleteTargets:
      return ({
        ...state,
        commentsDeleteTargets: action.push
          ? [
            ...state.commentsDeleteTargets,
            action.id,
          ]
          : [...state.commentsDeleteTargets].filter(targetID => {
            return targetID !== action.id;
          }),
      });

    case CommentsActionTypes.setInputName:
      return ({
        ...state,
        inputName: action.inputName,
      });

    case CommentsActionTypes.setInputEmail:
      return ({
        ...state,
        inputEmail: action.inputEmail,
      });

    case CommentsActionTypes.setInputComment:
      return ({
        ...state,
        inputComment: action.inputComment,
      });

    case CommentsActionTypes.setIsEmailValid:
      return ({
        ...state,
        isEmailValid: action.isEmailValid,
      });

    case CommentsActionTypes.setIsSubmitted:
      return ({
        ...state,
        isSubmitted: action.isSubmitted,
      });

    case CommentsActionTypes.setIsAddCommentLoading:
      return ({
        ...state,
        isAddCommentLoading: action.isAddCommentLoading,
      });

    default:
      return state;
  }
};
