// action types
export const START_LOADING = 'START_LOADING';
export const HANDLE_SUCCESS = 'HANDLE_SUCCESS';
export const SEARCHING_POSTS = 'SEARCHING_POSTS';
export const HANDLE_ERROR = 'HANDLE_ERROR';
export const HANDLE_REMOVE_POST = 'HANDLE_REMOVE';
export const HANDLE_REMOVE_COMMENT = 'HANDLE_REMOVE_COMMENT';

// action creators
export const startLoading = () => ({ type: START_LOADING });
export const handleSuccess = posts => (
  { type: HANDLE_SUCCESS, posts }
);
export const handleSearch = (searchingPosts) => (
  { type: SEARCHING_POSTS, searchingPosts }
);
export const handleError = () => ({ type: HANDLE_ERROR });
export const handleRemovePost = (id) => (
  { type: HANDLE_REMOVE_POST, id }
);
export const handleRemoveComment = (id) => (
  { type: HANDLE_REMOVE_COMMENT, id }
);
