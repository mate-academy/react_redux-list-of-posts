import ACTION_TYPES from './actionTypes';

export const startLoading = () => ({ type: ACTION_TYPES.START_LOADING });
export const handleError = () => ({ type: ACTION_TYPES.HANDLE_ERROR });

export const handleSuccess = ({ users, comments, posts }) => ({
  type: ACTION_TYPES.HANDLE_SUCCESS,
  payload: { users, comments, posts },
});

export const deletePost = itemId => ({
  type: ACTION_TYPES.HANDLE_DELETE_POST,
  payload: itemId,
});

export const deleteComment = itemId => ({
  type: ACTION_TYPES.HANDLE_DELETE_COMMENT,
  payload: itemId,
});
