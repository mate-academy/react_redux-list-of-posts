const apiUrl = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/';


const getAll = <T>(url: string): Promise<T[]> => {
  return fetch(`${apiUrl}${url}.json`).then(res => res.json());
};

export const getPosts = () => getAll<Post>('/posts');
export const getUsers = () => getAll<User>('/users');
export const getComments = () => getAll<Comments>('/comments');


export const getAppData = async () => {
  const todosFromServer = await getPosts();
  const usersFromServer = await getUsers();
  const commentsFromServer = await getComments();


  return todosFromServer.map((post) => {
    return {
      ...post,
      user: usersFromServer.find(user => user.id === post.userId),
      comments: commentsFromServer.filter((comment: Comments) => comment.postId === post.id),
    };
  });
};
