export const LOAD_POSTS = 'LOAD_POSTS';
export const LOAD_POST = 'LOAD_POST';
export const SET_POST_ID = 'SET_POST_ID';
export const LOAD_COMMENTS = 'LOAD_COMMENTS';
export const SET_SELECTED_POST = 'SET_SELECTED_POST';

export const loadPostsAction = (payload: Post[]) => ({
  type: LOAD_POSTS,
  payload,
});

export const loadPostAction = (payload: Post) => ({
  type: LOAD_POST,
  payload,
});

export const setPostIdAction = (payload: number) => ({
  type: SET_POST_ID,
  payload,
});

export const loadCommentsAction = (payload: CommentType[]) => ({
  type: LOAD_COMMENTS,
  payload,
});

export const setSelectedPostAction = (payload: number | null) => ({
  type: SET_SELECTED_POST,
  payload,
});
