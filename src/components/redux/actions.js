export const ACTION_TYPES = {
  SAVE: 'SAVE',
  SET_LOAD_ERROR: 'SET_LOAD_ERROR',
  START_LOADING: 'START_LOADING',
  STOP_LOADING: 'STOP_LOADING',
  DELETE_POST: 'DELETE_POST',
  DELETE_COMMENT: 'DELETE_COMMENT',
  FILTER: 'FILTER',
  FILTER_BUTTON: 'FILTER_BUTTON',
};

const save = data => ({
  type: ACTION_TYPES.SAVE,
  payload: data,
});

const setError = error => ({
  type: ACTION_TYPES.SET_LOAD_ERROR,
  payload: error,
});

const startLoading = () => ({
  type: ACTION_TYPES.START_LOADING,
});

const stopLoading = () => ({
  type: ACTION_TYPES.STOP_LOADING,
});

const deletePost = postId => ({
  type: ACTION_TYPES.DELETE_POST,
  postId,
});

const deleteComment = commentId => ({
  type: ACTION_TYPES.DELETE_COMMENT,
  commentId,
});

const filter = value => ({
  type: ACTION_TYPES.FILTER,
  payload: value,
});

const filterButton = chosenFilter => ({
  type: ACTION_TYPES.FILTER_BUTTON,
  payload: chosenFilter,
});

export const buttonFilter = chosenFilter => (dispatch) => {
  dispatch(filterButton(chosenFilter));
};

export const filterAction = value => (dispatch) => {
  dispatch(filter(value));
};

export const commentDelete = commentId => (dispatch) => {
  dispatch(deleteComment(commentId));
};

export const postDelete = postId => (dispatch) => {
  dispatch(deletePost(postId));
};

const urls = [
  'https://jsonplaceholder.typicode.com/posts',
  'https://jsonplaceholder.typicode.com/users',
  'https://jsonplaceholder.typicode.com/comments',
];

export const postsURL = () => (dispatch) => {
  dispatch(startLoading());

  const promises = urls.map(url => fetch(url).then(y => y.json()));

  Promise.all(promises).then((results) => {
    dispatch(save(results));
  })
    .catch(error => dispatch(setError(error.message)))
    .finally(() => dispatch(stopLoading()));
};
