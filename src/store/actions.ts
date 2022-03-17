export const LOAD_POSTS = 'LOAD_POSTS';
export const LOAD_USERS = 'LOAD_USERS';

export const LoadPostsAction = (payload: Post[]) => ({
  type: LOAD_POSTS,
  payload,
});

export const LoadUsersAction = (payload: User[]) => ({
  type: LOAD_USERS,
  payload,
});
