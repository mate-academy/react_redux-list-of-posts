export const ACTION_TYPES = {
  LOAD: 'LOAD',
  HANDLE_SUCCESS: 'HANDLE_SUCCESS',
  HANDLE_ERROR: 'HANDLE_ERROR',
  HANDLE_REMOVE_POST: 'HANDLE_REMOVE_POST',
  HANDLE_REMOVE_COMMENT: 'HANDLE_REMOVE_COMMENT',
};

const {
  LOAD,
  HANDLE_SUCCESS,
  HANDLE_ERROR,
  HANDLE_REMOVE_POST,
  HANDLE_REMOVE_COMMENT,
} = ACTION_TYPES;

export const startLoading = () => ({ type: LOAD });
export const handleSuccess = ({ posts, users, comments }) => ({
  type: HANDLE_SUCCESS,
  payload: { posts, users, comments },
});
export const handleError = () => ({ type: HANDLE_ERROR });

export const handleRemovePost = id => ({
  type: HANDLE_REMOVE_POST,
  payload: id,
});
export const handleRemoveComment = id => ({
  type: HANDLE_REMOVE_COMMENT,
  payload: id,
});
