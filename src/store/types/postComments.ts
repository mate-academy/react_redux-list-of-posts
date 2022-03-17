export interface PostCommentsState {
  postComments: PostComment [];
  loading: boolean;
  error: string | null;
}

export enum PostCommentsTypes {
  FETCH_POST_COMMENTS = 'FETCH_POST_COMMENTS',
  FETCH_POST_COMMENTS_SUCCESS = 'FETCH_POST_COMMENTS_SUCCESS',
  FETCH_POST_COMMENTS_ERROR = 'FETCH_POST_COMMENTS_ERROR',
}

export interface FetchPostCommentsAction {
  type: PostCommentsTypes.FETCH_POST_COMMENTS,
}

export interface FetchPostCommentsSuccessAction {
  type: PostCommentsTypes.FETCH_POST_COMMENTS_SUCCESS,
  payload: PostComment[];
}

export interface FetchPostCommentsErrorAction {
  type: PostCommentsTypes.FETCH_POST_COMMENTS_ERROR,
  payload: string;
}

export type PostCommentsAction =
FetchPostCommentsAction
| FetchPostCommentsSuccessAction
| FetchPostCommentsErrorAction;
