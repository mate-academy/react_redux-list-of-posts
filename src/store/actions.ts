export const LOAD_POSTS = 'LOAD_POSTS';

export const LoadPostsAction = (payload: Post[]) => ({
  type: LOAD_POSTS,
  payload,
});
