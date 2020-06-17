const API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api';

const USERS_PATH = '/users.json';
const POSTS_PATH = '/posts.json';
const COMMENTS_PATH = '/comments.json';

const getData = <T>(url: string): Promise<T[]> => {
  return fetch(API_URL + url)
    .then(response => response.json());
};

export const getPostsData = async (): Promise<PreparedPost[]> => {
  const usersFromServer = await getData<User>(USERS_PATH);
  const postsFromServer = await getData<Post>(POSTS_PATH);
  const commentsFromServer = await getData<Comment>(COMMENTS_PATH);

  const preparedPosts = postsFromServer.map((post: Post) => ({
    ...post,
    user: usersFromServer.find((user: User) => user.id === post.userId),
    comments: commentsFromServer.filter((comment: Comment) => comment.postId === post.id),
  }));

  return preparedPosts;
};
