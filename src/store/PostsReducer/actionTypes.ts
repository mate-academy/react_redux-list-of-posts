/* eslint-disable @typescript-eslint/indent */
import { Post } from '../../types/Post';

export enum PostsActionTypes {
  setPosts = 'SET_POSTS',
  setVisiblePosts = 'SET_VISIBLE_POSTS',
  setPostTitleQuery = 'SET_POST_TITLE_QUERY',
  setPostSelectValue = 'SET_POST_SELECT_VALUE',
  setSelectedPostId = 'SET_SELECTED_POST_ID',
  setSelectPost = 'SET_SELECT_POST',
  setIsPostLoading = 'SET_IS_POST_LOADING',
  setIsPostListLoading = 'SET_IS_POST_LIST_LOADING',
  setPostsDeleteTargets = 'SET_DELETE_TARGETS',
}

export interface SelectedPostId {
  type: PostsActionTypes.setSelectedPostId;
  selectedPostId: number | null;
}

export interface SelectValue {
  type: PostsActionTypes.setPostSelectValue;
  selectValue: string;
}

export interface SelectedPost {
  type: PostsActionTypes.setSelectPost,
  selectedPost: Post | null,
}

export interface IsPostLoading {
  type: PostsActionTypes.setIsPostLoading,
  isPostLoading: boolean,
}

export interface Posts {
  type: PostsActionTypes.setPosts,
  posts: Post[],
}

export interface IsPostListLoading {
  type: PostsActionTypes.setIsPostListLoading,
  isPostListLoading: boolean,
}

export interface PostTitleQuery {
  type: PostsActionTypes.setPostTitleQuery,
  titleQuery: string,
}

export interface VisiblePosts {
  type: PostsActionTypes.setVisiblePosts,
  visiblePosts: Post[],
}

export interface PostsDeleteTargets {
  type: PostsActionTypes.setPostsDeleteTargets,
  id: number,
  push: boolean,
}

export type PostsActions = SelectedPostId
  | SelectValue
  | SelectedPost
  | IsPostLoading
  | Posts
  | IsPostListLoading
  | PostTitleQuery
  | VisiblePosts
  | PostsDeleteTargets;
