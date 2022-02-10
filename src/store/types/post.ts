export interface PostState {
  posts: Post[];
  isLoadingPosts: boolean;
  isLoadingPost: boolean;
  selectedPost: Post | null;
  selectedPostId: number;
}

export enum PostActionTypes {
  LOADING_POSTS = 'LOADING_POSTS',
  LOADING_POSTS_SUCCESS = 'LOADING_POSTS_SUCCESS',
  CHANGE_POSTID = 'CHANGE_POSTID',
  LOADING_POST = 'LOADING_POST',
  LOADING_POST_SUCCESS = 'LOADING_POST_SUCCESS',
  DELETE_POST = 'DELETE_POST',
}

export interface LoadingPostsAction {
  type: PostActionTypes.LOADING_POSTS;
}
export interface LoadingPostAction {
  type: PostActionTypes.LOADING_POST;
}
export interface ChangePostIdAction {
  type: PostActionTypes.CHANGE_POSTID,
  payload: number;
}
export interface LoadingPostsSuccessAction {
  type: PostActionTypes.LOADING_POSTS_SUCCESS,
  payload: Post[],
}
export interface LoadingPostSuccessAction {
  type: PostActionTypes.LOADING_POST_SUCCESS,
  payload: Post,
}
export interface DeletePostAction {
  type: PostActionTypes.DELETE_POST,
  payload: number,
}

export type PostAction =
  LoadingPostsSuccessAction
  | LoadingPostsAction
  | ChangePostIdAction
  | LoadingPostAction
  | LoadingPostSuccessAction
  | DeletePostAction;
