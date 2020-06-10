import { Posts, User, Comment } from './interface';

const ApoUrl = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api';

const getAll = <T>(url: string): Promise<T[]> => {
  return fetch(ApoUrl + url)
    .then(response => response.json());
};

export const getPost = () => getAll<Posts>('/posts.json');
export const getUsers = () => getAll<User>('/users.json');
export const getComments = () => getAll<Comment>('/comments.json');

export const getPreparedPosts = async () => {
  const postFromServer = await getPost();
  const userFromServer = await getUsers();
  const commentsFromServer = await getComments();

  const preparedListOfPosts = postFromServer.map(item => ({
    ...item,
    user: userFromServer.find(itemId => (itemId.id === item.userId)),
    comments: commentsFromServer.filter(postId => (postId.postId === item.userId)),
  }));

  return preparedListOfPosts;
};
