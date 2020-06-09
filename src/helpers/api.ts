const API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api';

export const getPosts = () => {
  return fetch(`${API_URL}/posts.json`)
    .then(response => response.json());
};

export const getUsers = () => {
  return fetch(`${API_URL}/users.json`)
    .then(response => response.json());
};

export const getComments = () => {
  return fetch(`${API_URL}/comments.json`)
    .then(response => response.json());
};

export const getPostsFromServer = async () => {
  const [postsFromServer, usersFromServer, commentsFromServer] = await Promise.all(
    [getPosts(), getUsers(), getComments()],
  );

  const preparedPosts = postsFromServer.map((post: PostProps) => ({
    ...post,
    comments: commentsFromServer.filter((comment: CommentProps) => comment.postId === post.id),
    author: usersFromServer.find((user: UserProps) => user.id === post.userId),
  }));

  return preparedPosts;
};
