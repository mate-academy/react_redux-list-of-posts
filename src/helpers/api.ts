const API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api';

export const getAll = <T>(url: string): Promise<T> => {
  return fetch(`${API_URL}/${url}.json`)
    .then(response => response.json());
};

export const getPostsFromServer = async () => {
  const postsFromServer = await getAll<Post[]>('/posts');
  const commentsFromServer = await getAll<Comment[]>('/comments');
  const userFromServer = await getAll<User[]>('/users');

  return postsFromServer.map(post => ({
    ...post,
    commentList: commentsFromServer.filter(comment => comment.postId === post.id),
    user: userFromServer.find(user => user.id === post.userId),
  }));
};
