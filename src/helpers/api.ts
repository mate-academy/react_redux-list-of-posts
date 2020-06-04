const API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/';

const getAll = <T> (url: string): Promise<T[]> => {
  return fetch(API_URL + url)
    .then(responce => responce.json());
};

const getPosts = () => getAll<Post>('posts.json');
const getUsers = () => getAll<User>('users.json');
const getComments = () => getAll<Comment>('comments.json');

export const loadPosts = async () => {
  const postFromServer = await getPosts();
  const usersFromServer = await getUsers();
  const commentsFromServer = await getComments();


  return postFromServer.map(post => {
    const user = usersFromServer
      .find((currentUser: User) => currentUser.id === post.userId);
    const userComments = commentsFromServer
      .filter((comment: Comment) => (comment.postId === post.id));

    return {
      ...post,
      user,
      userComments,
    };
  });
};
