export const LOAD_POSTS = 'LOAD_POSTS';
export const LOAD_USERS = 'LOAD_USERS';
export const LOAD_POST_DETAILS = 'LOAD_POST_DETAILS';
export const LOAD_POST_COMMENTS = 'LOAD_POST_COMMENTS';

export const LoadPostsAction = (payload: Post[]) => ({
  type: LOAD_POSTS,
  payload,
});

export const LoadUsersAction = (payload: User[]) => ({
  type: LOAD_USERS,
  payload,
});

export const LoadPostDetailsAction = (payload: Post | null) => ({
  type: LOAD_POST_DETAILS,
  payload,
});

export const LoadPostCommentsAction = (payload: PostComment[]) => ({
  type: LOAD_POST_COMMENTS,
  payload,
});
