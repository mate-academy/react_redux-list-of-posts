export interface PostsState {
  posts: Post [];
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

export enum PostsActionTypes {
  FETCH_POSTS = 'FETCH_POSTS',
  FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS',
  FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR',
  SET_SEARCH_QUERY = 'SET_SEARCH_QUERY',
}

export interface FetchPostsAction {
  type: PostsActionTypes.FETCH_POSTS,
}

export interface FetchPostsSuccessAction {
  type: PostsActionTypes.FETCH_POSTS_SUCCESS,
  payload: Post[],
}

export interface FetchPostsErrorAction {
  type: PostsActionTypes.FETCH_POSTS_ERROR,
  payload: string,
}

export interface SetSearchQueryAction {
  type: PostsActionTypes.SET_SEARCH_QUERY,
  payload: string,
}

export type PostsAction =
FetchPostsAction
| FetchPostsSuccessAction
| FetchPostsErrorAction
| SetSearchQueryAction;
