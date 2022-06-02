import { Post } from '../../types/Post';

export enum PostsActionTypes {
  setSelectedPostId = 'SET_SELECTED_POST_ID',
  setPostSelectValue = 'SET_POST_SELECT_VALUE',
  setSelectPost = 'SET_SELECT_POST',
  setIsPostLoading = 'SET_IS_POST_LOADING',
  setPosts = 'SET_POSTs',
  setIsPostListLoading = 'SET_IS_POST_LIST_LOADING',
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

export type PostsActions = SelectedPostId
| SelectValue
| SelectedPost
| IsPostLoading
| Posts
| IsPostListLoading;
