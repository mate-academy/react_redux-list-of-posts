const URL = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api';

const getPostsFromServer = () => {
  return fetch(`${URL}/posts.json`)
    .then(response => response.json());
};

const getCommentsFromServer = () => {
  return fetch(`${URL}/comments.json`)
    .then(response => response.json());
};

const getUsersFromServer = () => {
  return fetch(`${URL}/users.json`)
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
