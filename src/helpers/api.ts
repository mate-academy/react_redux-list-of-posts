const API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api';

const getAll = (url: string) => (
  fetch(`${API_URL}${url}.json`)
  .then(response => response.json())
)

const getPosts = () => getAll('/posts');
const getUsers = () => getAll('/users');
const getComments = () => getAll('/comments');

export const getAppData = async () => {
  const postsFromServer = await getPosts();
  const usersFromServer = await getUsers();
  const commentsFromServer = await getComments();

  return postsFromServer.map((post: PostFromServer) => ({
    ...post,
    postUser: usersFromServer.find((user: UserFromServer) => post.userId === user.id),
    postComment: commentsFromServer.filter((comment: CommentFromServer) => post.id === comment.postId)
  }))
}
