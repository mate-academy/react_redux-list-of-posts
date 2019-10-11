import { handleError, startLoading, handleSuccess } from '../actions';

const loadPostsAndUsers = () => (dispatch) => {
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
      .then(([res1, res2, res3]) => Promise
        .all([res1.json(), res2.json(), res3.json()]))
      .then(([posts, users, comments]) => {
        const preparedPosts = posts.map(post => ({
          ...post,
          user: users.find(user => user.id === post.userId),
          comments: comments.filter(comment => comment.postId === post.id),
        }));
        dispatch(handleSuccess(preparedPosts));
      })
      .catch(() => {
        dispatch(handleError());
      });
  }
  getData();
};

export default loadPostsAndUsers;
