const API_POSTS = 'https://jsonplaceholder.typicode.com/posts';
const API_COMMENTS = 'https://jsonplaceholder.typicode.com/comments';
const API_USERS = 'https://jsonplaceholder.typicode.com/users';

export const getPostsFromServer = () => (
  fetch(API_POSTS).then(response => response.json())
);

export const getCommentsFromServer = () => (
  fetch(API_COMMENTS).then(response => response.json())
);

export const getUsersFromServer = () => (
  fetch(API_USERS).then(response => response.json())
);
