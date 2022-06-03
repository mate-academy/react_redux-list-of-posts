import { Reducer } from 'react';
import { Post } from '../../types/Post';

import {
  PostsActions,
  PostsActionTypes,
} from './actionTypes';

export type PostsState = {
  posts: Post[],
  visiblePosts: Post[],
  selectValue: string,
  titleQuery: string,
  selectedPostId: number | null,
  selectedPost: Post | null,
  isPostLoading: boolean,
  isPostListLoading: boolean,
  postsDeleteTargets: number[],
};

const defaultState: PostsState = {
  posts: [],
  visiblePosts: [],
  selectValue: 'All users',
  titleQuery: '',
  selectedPostId: null,
  selectedPost: null,
  isPostLoading: false,
  isPostListLoading: true,
  postsDeleteTargets: [],
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

    case PostsActionTypes.setPostTitleQuery:
      return ({
        ...state,
        titleQuery: action.titleQuery,
      });

    case PostsActionTypes.setVisiblePosts:
      return ({
        ...state,
        visiblePosts: action.visiblePosts,
      });

    case PostsActionTypes.setPostsDeleteTargets:
      return ({
        ...state,
        postsDeleteTargets: action.push
          ? [
            ...state.postsDeleteTargets,
            action.id,
          ]
          : [...state.postsDeleteTargets].filter(targetID => {
            return targetID !== action.id;
          }),
      });

    default:
      return state;
  }
};
