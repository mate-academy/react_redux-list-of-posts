const API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api';

const getPosts = () => {
  return fetch(`${API_URL}/posts.json`)
    .then(response => response.json());
};

const getUsers = () => {
  return fetch(`${API_URL}/users.json`)
    .then(response => response.json());
};

const getComments = () => {
  return fetch(`${API_URL}/comments.json`)
    .then(response => response.json());
};

export const preparedPosts = async (): Promise<PreparedPost[]> => {
  const [posts, users, comments] = await Promise.all([
    getPosts(),
    getUsers(),
    getComments()
  ]);

  return posts.map((post: PreparedPost) => ({
    ...post,
    user: users.find((user: User) => post.userId === user.id),
    comments: comments.filter((comment: Comment) => comment.postId === post.id),
  }))
};


