import { AnyAction } from 'redux';
import { CommentsState } from '../../types/CommentsState';

import {
  SET_SELECTED_POST_COMMENTS,
  SET_IS_COMMENTS_VISIBLE,
  SET_IS_DELETE_COMMENTS_LOADING,
  SET_DELETE_TARGETS,
} from './actions';

const defaultState: CommentsState = {
  selectedPostComments: [],
  isCommentsVisible: true,
  isDeleteCommentLoading: false,
  deleteTargets: [],
  inputName: '',
  inputEmail: '',
  inputComment: '',
  isEmailValid: true,
  isSubmitted: false,
  isAddCommentLoading: false,
};

export const CommentsReducer = (state = defaultState, action: AnyAction) => {
  switch (action.type) {
    case (SET_SELECTED_POST_COMMENTS):
      return ({
        ...state,
        selectedPostComments: [...action.selectedPostComments],
      });

    case (SET_IS_COMMENTS_VISIBLE):
      return ({
        ...state,
        isCommentsVisible: action.isCommentsVisible,
      });

    case (SET_IS_DELETE_COMMENTS_LOADING):
      return ({
        ...state,
        isDeleteCommentLoading: action.isDeleteCommentLoading,
      });

    case (SET_DELETE_TARGETS):
      return ({
        ...state,
        deleteTargets: action.push
          ? [...state.deleteTargets].push(action.deleteTargets)
          : [...state.deleteTargets].filter(targetID => {
            return targetID !== action.deleteTargets;
          }),
      });

    default:
      return state;
  }
};
