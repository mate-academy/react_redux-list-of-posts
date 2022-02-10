export interface CommentState {
  comments: PostComment[];
  isLoading: boolean;
}

export enum CommentActionTypes {
  LOADING_COMMENTS = 'LOADING_COMMENTS',
  LOADING_COMMENTS_SUCCESS = 'LOADING_COMMENTS_SUCCESS',
  DELETE_COMMENT = 'DELETE_COMMENT',
  ADD_COMMENT = 'ADD_COMMENT',
}

export interface LoadingCommentsAction {
  type: CommentActionTypes.LOADING_COMMENTS,
}
export interface LoadingCommentsSuccessAction {
  type: CommentActionTypes.LOADING_COMMENTS_SUCCESS,
  payload: PostComment[],
}
export interface DeleteCommentAction {
  type: CommentActionTypes.DELETE_COMMENT,
  payload: number,
}
export interface AddCommentAction {
  type: CommentActionTypes.ADD_COMMENT,
  payload: PostComment,
}

export type CommentAction =
  LoadingCommentsAction
  | LoadingCommentsSuccessAction
  | DeleteCommentAction
  | AddCommentAction;
