import { startLoading, handleSuccess, handleError } from './actions';

const loadDatas = () => (dispatch) => {
  const usersApi = 'https://jsonplaceholder.typicode.com/users';
  const commentsApi = 'https://jsonplaceholder.typicode.com/comments';
  const postsApi = 'https://jsonplaceholder.typicode.com/posts';
  dispatch(startLoading());
  function getData() {
    Promise.all([
      fetch(postsApi),
      fetch(usersApi),
      fetch(commentsApi),
    ])
      .then(([res1, res2, res3]) => ([res1.json(), res2.json(), res3.json()]))
      .then(([posts, users, comments]) => {
        dispatch(handleSuccess({ posts, users, comments }));
      })
      .catch(() => {
        dispatch(handleError());
      });
    console.log(usersApi);
  }

  getData();
};

export default loadDatas;
