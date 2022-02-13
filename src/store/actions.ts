export const USER_ID = 'USER_ID';
export const POST_ID = 'POST_ID';
export const LOAD_USERS = 'LOAD_USERS';
export const LOAD_POSTS = 'LOAD_POSTS';
export const LOAD_COMMENTS = 'LOAD_COMMENTS';
export const LOAD_POST_DETAIL = 'LOAD_POST_DETAIL';

export const loadUserIdAction = (payload: number) => ({
  type: USER_ID,
  payload,
});

export const loadPostIdAction = (payload: number) => ({
  type: POST_ID,
  payload,
});

export const loadUsersAction = (payload: User[]) => ({
  type: LOAD_USERS,
  payload,
});

export const loadPostDetailAction = (payload: Post) => ({
  type: LOAD_POST_DETAIL,
  payload,
});

export const loadPostsAction = (payload: Post[]) => ({
  type: LOAD_POSTS,
  payload,
});

export const loadCommentsdAction = (payload: PostComment[]) => ({
  type: LOAD_COMMENTS,
  payload,
});
