import ACTION_TYPES from './actionTypes';

export const startLoading = () => ({ type: ACTION_TYPES.START_LOADING });
export const handleError = () => ({ type: ACTION_TYPES.HANDLE_ERROR });
export const handleSuccess = preparedPosts => ({
  type: ACTION_TYPES.HANDLE_SUCCESS,
  payload: preparedPosts,
});
export const deletePost = itemId => ({
  type: ACTION_TYPES.HANDLE_DELETE_POST,
  payload: itemId,
});
export const deleteComment = itemId => ({
  type: ACTION_TYPES.HANDLE_DELETE_COMMENT,
  payload: itemId,
});
