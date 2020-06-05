const API_URL = 'https://jsonplaceholder.typicode.com';

const getPosts = async (): Promise<PostFromServer[]> => {
  const response = await fetch(`${API_URL}/posts`);

  return response.json();
};

const getComments = async (): Promise<Comment[]> => {
  const response = await fetch(`${API_URL}/comments`);

  return response.json();
};

const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_URL}/users`);

  return response.json();
};

export const fetchPreparedPosts = async (): Promise<Post[]> => {
  const [
    posts,
    users,
    comments,
  ] = await Promise.all([getPosts(), getUsers(), getComments()]);

  return posts.map(post => ({
    ...post,
    user: users.find(currentUser => post.userId === currentUser.id) as User,
    comments: comments.filter(comment => post.id === comment.postId) as Comment[],
  }));
};
