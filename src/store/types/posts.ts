import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';

export interface PostsState {
  posts: Post[] | never[],
  loadingPosts: boolean,
  errorPosts: null | string,
  postDetails: Post | null,
  commentsPost: Comment[],
}

export enum PostsActionsEnum {
  FETCH_POSTS_LOADING = 'FETCH_POSTS_LOADING',
  SET_POSTS = 'SET_POSTS',
  FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR',
  SET_DETAILS_POST = 'SET_DETAILS_POST',
  FETCH_DETAILS_POST = 'FETCH_DETAILS_POST',
  SET_COMMENTS_POST = 'SET_COMMENTS_POST',
  FETCH_COMMENTS_POST = 'FETCH_COMMENTS_POST',
  SEND_COMMENT = 'SEND_COMMENT',
  SET_NEW_COMMENT = 'SET_NEW_COMMENT',
  DELETE_COMMENT = 'DELETE_COMMENT',
}

export interface SetPostsActions {
  type: PostsActionsEnum.SET_POSTS,
  payload: Post[]
}

export interface FetchPostsLoadingActions {
  type: PostsActionsEnum.FETCH_POSTS_LOADING,
}

export interface FetchPostsErrorActions {
  type: PostsActionsEnum.FETCH_POSTS_ERROR,
  payload: string | null,
}

export interface SetDetailsPost {
  type: PostsActionsEnum.SET_DETAILS_POST,
  payload: Post | null,
}

export interface SetCommentsPost {
  type: PostsActionsEnum.SET_COMMENTS_POST,
  payload: Comment[],
}

export interface FetchCommentsPost {
  type: PostsActionsEnum.FETCH_COMMENTS_POST,
  payload: number | string,
}

export interface SetNewComment {
  type: PostsActionsEnum.SET_NEW_COMMENT,
  payload: Comment,
}

export interface DeleteComment {
  type: PostsActionsEnum.DELETE_COMMENT,
  payload: number,
}

export type PostActions = SetPostsActions
| FetchPostsLoadingActions
| FetchPostsErrorActions
| SetDetailsPost
| SetCommentsPost
| FetchCommentsPost
| SetNewComment
| DeleteComment;
