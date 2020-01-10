import axios from 'axios/index';

export const START_LOADING = 'START_LOADING';
export const HANDLE_SUCCESS = 'HANDLE_SUCCESS';
export const HANDLE_ERROR = 'HANDLE_ERROR';
export const POST_DELETE = 'POST_DELETE';
export const COMMENT_DELETE = 'COMMENT_DELETE';
export const SEARCH_POST = 'SEARCH_POST';

export const createActionStartLoading = () => ({
  type: START_LOADING,
});

export const createActionHandleSuccess = combineData => ({
  type: HANDLE_SUCCESS,
  combineData,
});

export const createActionHandleError = () => ({
  type: HANDLE_ERROR,
});

export const createActionDeletePost = id => ({
  type: POST_DELETE,
  id,
});

export const createActionDeleteComment = id => ({
  type: COMMENT_DELETE,
  id,
});

export const createActionSearchQuery = value => ({
  type: SEARCH_POST,
  value,
});

export const createActionloadTodos = () => async(dispatch) => {
  dispatch(createActionStartLoading());

  const [
    postsFromServer,
    usersFromServer,
    commentsFromServer,

  ] = await Promise.all([
    axios.get('https://jsonplaceholder.typicode.com/posts'),
    axios.get('https://jsonplaceholder.typicode.com/users'),
    axios.get('https://jsonplaceholder.typicode.com/comments'),
  ]).catch(() => {
    dispatch(createActionHandleError());
  });

  const combineData = postsFromServer.data.map(post => ({
    ...post,
    user: usersFromServer.data.find(user => user.id === post.userId),
    comments: commentsFromServer.data
      .filter(comment => comment.postId === post.id),
  }));

  dispatch(createActionHandleSuccess(combineData));
};
