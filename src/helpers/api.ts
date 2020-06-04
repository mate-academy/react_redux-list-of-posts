const URL = 'https://jsonplaceholder.typicode.com';

const getPostsFromServer = () => {
  return fetch(`${URL}/posts`)
    .then(response => response.json());
};

const getCommentsFromServer = () => {
  return fetch(`${URL}/comments`)
    .then(response => response.json());
};

const getUsersFromServer = () => {
  return fetch(`${URL}/users`)
    .then(response => response.json());
};

export const getPreparedDataFromServer = async () => {
  const [postsFromServer,
    commentsFromServer,
    usersFromServer] = await Promise.all([getPostsFromServer(),
    getCommentsFromServer(), getUsersFromServer()]);

  const preparedPosts = postsFromServer.map((post: Post) => ({
    ...post,
    user: usersFromServer.find((user: User) => user.id === post.userId),
    comments: commentsFromServer.filter(
      (comment: Comment) => comment.postId === post.id,
    ),
  }));

  return preparedPosts;
};
