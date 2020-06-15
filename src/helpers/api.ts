const API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api';

const getAll = <T>(url: string): Promise<T[]> => (
  fetch(`${API_URL}${url}.json`)
    .then(response => response.json())
);

const getPosts = () => getAll<PostFromServer>('/posts');
const getUsers = () => getAll<UserFromServer>('/users');
const getComments = () => getAll<CommentFromServer>('/comments');

export const getAppData = async () => {
  const postsFromServer = await getPosts();
  const usersFromServer = await getUsers();
  const commentsFromServer = await getComments();

  return postsFromServer.map((post) => ({
    ...post,
    postUser: usersFromServer.find((user: UserFromServer) => post.userId === user.id),
    postComment: commentsFromServer
      .filter((comment: CommentFromServer) => post.id === comment.postId),
  }));
};
