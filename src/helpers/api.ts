export const getUsers = (): Promise<User[]> => {
  return fetch('https://mate-academy.github.io/react_dynamic-list-of-posts/api/users.json')
    .then(response => response.json());
};

export const getPosts = (): Promise<Post[]> => {
  return fetch('https://mate-academy.github.io/react_dynamic-list-of-posts/api/posts.json')
    .then(response => response.json());
};

export const getComments = (): Promise<Comment[]> => {
  return fetch('https://mate-academy.github.io/react_dynamic-list-of-posts/api/comments.json')
    .then(response => response.json());
};

export const getAppData = async () => {
  const postsFromServer = await getPosts();
  const usersFromServer = await getUsers();
  const commentsFromServer = await getComments();

  return postsFromServer.map((post: Post) => ({
    ...post,
    user: usersFromServer.find((user: User) => post.userId === user.id),
    comments: commentsFromServer.filter((comment: Comment) => post.id === comment.postId),
  }));
};
