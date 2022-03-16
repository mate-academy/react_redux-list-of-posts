export const LOAD_POSTS = 'LOAD_POSTS';
export const CHANGE_USER = 'CHANGE_USER';
export const LOAD_USERS = 'LOAD_USERS';
export const CHANGE_POST = 'CHANGE_POST';
export const LOAD_COMMENTS = 'LOAD_COMMENTS';
export const CHANGE_NAME = 'CHANGE_NAME';
export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const CHANGE_COMMENT_BODY = 'CHANGE_COMMENT_BODY';
export const CHANGE_COMMENTS_VISIBILITY = 'CHANGE_COMMENTS_VISIBILITY';

export const loadPostsAction = (payload: Post[]) => ({
  type: LOAD_POSTS,
  payload,
});

export const changeUserIdAction = (payload: number) => ({
  type: CHANGE_USER,
  payload,
});

export const loadUsersAction = (payload: User[]) => ({
  type: LOAD_USERS,
  payload,
});

export const changePostAction = (payload: number) => ({
  type: CHANGE_POST,
  payload,
});

export const loadCommentsAction = (payload: Comment[]) => ({
  type: LOAD_COMMENTS,
  payload,
});

export const changeNameAction = (payload: string) => ({
  type: CHANGE_NAME,
  payload,
});

export const changeEmailAction = (payload: string) => ({
  type: CHANGE_EMAIL,
  payload,
});

export const changeCommentBodyAction = (payload: string) => ({
  type: CHANGE_COMMENT_BODY,
  payload,
});

export const changeCommentsVisibilityAction = (payload: boolean) => ({
  type: CHANGE_COMMENTS_VISIBILITY,
  payload,
});
