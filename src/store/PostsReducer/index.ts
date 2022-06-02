import { Reducer } from 'react';
import { Post } from '../../types/Post';
import { User } from '../../types/User';

import {
  PostsActions,
  PostsActionTypes,
} from './actionTypes';

export type PostsState = {
  user: User | null,
  selectedPostId: number | null,
  selectValue: string,
  selectedPost: Post | null,
  isPostLoading: boolean,
  posts: Post[],
  isPostListLoading: boolean,
};

const defaultState: PostsState = {
  user: null,
  selectedPostId: null,
  selectValue: 'All users',
  selectedPost: null,
  isPostLoading: false,
  posts: [],
  isPostListLoading: false,
};

export const PostsReducer: Reducer<PostsState, PostsActions> = (
  state = defaultState,
  action: PostsActions,
) => {
  switch (action.type) {
    case PostsActionTypes.setSelectedPostId:
      return ({
        ...state,
        selectedPostId: action.selectedPostId,
      });

    case PostsActionTypes.setPostSelectValue:
      return ({
        ...state,
        selectValue: action.selectValue,
      });

    case PostsActionTypes.setSelectPost:
      return ({
        ...state,
        selectedPost: action.selectedPost,
      });

    case PostsActionTypes.setIsPostLoading:
      return ({
        ...state,
        isPostLoading: action.isPostLoading,
      });

    case PostsActionTypes.setPosts:
      return ({
        ...state,
        posts: [...action.posts],
      });

    case PostsActionTypes.setIsPostListLoading:
      return ({
        ...state,
        isPostListLoading: action.isPostListLoading,
      });

    default:
      return state;
  }
};
