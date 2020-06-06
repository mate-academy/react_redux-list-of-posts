const API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api';

const getAll = <T>(url: string): Promise<T[]> => {
  return fetch(API_URL + url)
    .then(response => response.json());
}

export const posts = () => getAll<Posts>('/posts.json');

export const users = () => getAll<Users>('/users.json');

export const comments = () => getAll<Comments>('/comments.json');

export const getPostsFromServer = async (): Promise<PostWithUser[]> => {
  const [
    postsFromServer,
    usersFromServer,
    commentsFromServer,
  ] = await Promise.all([posts(), users(), comments()]);

  return postsFromServer.map((post) => ({
    ...post,
    user: usersFromServer.find((user) => user.id === post.userId) as Users,
    comments: commentsFromServer.filter((comment) => comment.postId === post.id),

}));
};

