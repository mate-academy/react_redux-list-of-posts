export function fetchMessage(): Promise<string> {
  // this is just a fake promise resolved in 2 seconds
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('Message from server');
    }, 2000);
  });
}

const API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api';

const getAllData = <T>(url: string): Promise<T[]> => {
  return fetch(API_URL + url)
    .then(response => response.json());
};

const posts = () => getAllData<PostType>('/posts.json');
const users = () => getAllData<UserType>('/users.json');
const comments = () => getAllData<CommentType>('/comments.json');

export const getPostsFromServer = async (): Promise<PostType[]> => {
  const [
    postFromServer,
    usersFromServer,
    commentsFromServer,
  ] = await Promise.all([posts(), users(), comments()]);

  return postFromServer.map(post => ({
    ...post,
    user: usersFromServer.find(user => user.id === post.userId) as UserType,
    comments: commentsFromServer.filter(comment => comment.postId === post.id),
  }));
};
