const API_URL = 'https://jsonplaceholder.typicode.com';

const fetchPosts = () => {
  return fetch(`${API_URL}/posts`)
    .then(response => response.json());
};

const fetchUsers = () => {
  return fetch(`${API_URL}/users`)
    .then(response => response.json());
};

const fetchComments = () => {
  return fetch(`${API_URL}/comments`)
    .then(response => response.json());
};

export const fetchPreparedPosts = async () => {
  const [posts, users, comments] = await Promise.all(
    [fetchPosts(), fetchUsers(), fetchComments()],
  );

  const preparedPosts = posts.map((post: Post) => ({
    ...post,
    user: users.find((user: User) => user.id === post.userId),
    comments: comments.filter((comment: Comment) => comment.postId === post.id),
  }));

  return preparedPosts;
};
