import { handleError, startLoading, handleSuccess } from './actions';

export const loadDatas = () => (dispatch) => {
  dispatch(startLoading());
  (async function load() {
    const [
      usersResponse,
      postsResponse,
      commentsResponse,
    ] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users'),
      fetch('https://jsonplaceholder.typicode.com/posts'),
      fetch('https://jsonplaceholder.typicode.com/comments'),
    ]);

    const users = await usersResponse.json()
      .catch(error => dispatch(handleError(error)));
    const posts = await postsResponse.json()
      .catch(error => dispatch(handleError(error)));
    const comments = await commentsResponse.json()
      .catch(error => dispatch(handleError(error)));

    dispatch(handleSuccess({ users, posts, comments }));
  })();
};

export const handleSort = () => {

};
