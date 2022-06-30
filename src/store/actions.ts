import {
  Action, Comment, Post, User,
} from '../react-app-env';

export const SET_POSTS = 'SET_TODOS';
export const ADD_POST = 'ADD_POST';
export const SET_USER_ID = 'SET_USER';
export const SET_ALL_USERS = 'SET_ALL_USERS';
export const SET_COMMENT_LIST = 'SET_COMMENT_LIST';
export const SET_SELECT_POST = 'SET_SELECT_POST';
export const SET_SINGLE_SELECT_POST = 'SET_SINGLE_SELECT_POST';
export const SET_NEED_FOR_UPDATE = 'SET_NEED_FOR_UPDATE';

export const setPostsAction = (payload: Post[]): Action => ({
  type: SET_POSTS,
  payload,
});

export const addPostAction = (payload: Post): Action => ({
  type: ADD_POST,
  payload,
});

export const setUserIdAction = (payload: number): Action => ({
  type: SET_USER_ID,
  payload,
});

export const setAllUsersAction = (payload: User[]): Action => ({
  type: SET_ALL_USERS,
  payload,
});

export const setCommentListAction = (payload: Comment[]): Action => ({
  type: SET_COMMENT_LIST,
  payload,
});

export const setSelectedPostId = (payload: number | null): Action => ({
  type: SET_SELECT_POST,
  payload,
});

export const setSingleSelectedPost = (payload: Post | null): Action => ({
  type: SET_SINGLE_SELECT_POST,
  payload,
});

export const setNeedToUpdate = (payload: boolean): Action => ({
  type: SET_NEED_FOR_UPDATE,
  payload,
});
