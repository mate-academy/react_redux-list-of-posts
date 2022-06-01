import { AnyAction } from 'redux';
import { PostsState } from '../../types/PostsState';

import {
  SET_USER,
  SET_SELECTED_POST_ID,
  SET_POST_SELECT_VALUE,
  SET_SELECTED_POST,
  SET_IS_POST_LOADING,
} from './actions';

const defaultState: PostsState = {
  user: null,
  selectedPostId: null,
  selectValue: 'All users',
  selectedPost: null,
  isPostLoading: false,
};

export const PostsReducer = (state = defaultState, action: AnyAction) => {
  switch (action.type) {
    case (SET_USER):
      return ({
        ...state,
        user: action.user,
      });

    case (SET_SELECTED_POST_ID):
      return ({
        ...state,
        selectedPostId: action.selectedPostId,
      });

    case (SET_POST_SELECT_VALUE):
      return ({
        ...state,
        selectValue: action.selectValue,
      });

    case (SET_SELECTED_POST):
      return ({
        ...state,
        selectedPost: action.selectedPost,
      });

    case (SET_IS_POST_LOADING):
      return ({
        ...state,
        isPostLoading: action.isPostLoading,
      });

    default:
      return state;
  }
};
