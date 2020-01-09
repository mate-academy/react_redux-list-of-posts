// eslint-disable-next-line max-len
export const getPosts = () => fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .catch(() => 'Something went wrong');

// eslint-disable-next-line max-len
export const getUsers = () => fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .catch(() => 'Something went wrong');

// eslint-disable-next-line max-len
export const getComments = () => fetch('https://jsonplaceholder.typicode.com/comments')
  .then(response => response.json())
  .catch(() => 'Something went wrong');
