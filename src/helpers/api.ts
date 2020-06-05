const API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/';
const POSTS_URL = 'posts';
const USERS_URL = 'users';
const COMMENTS_URL = 'comments';

const getDataFromServer = async (url: string) => {
  const response = await fetch(`${API_URL}${url}.json`);

  return response.json();
};

export const getDataPosts = async () => {
  const [posts, users, comments] = await Promise.all([
    getDataFromServer(POSTS_URL),
    getDataFromServer(USERS_URL),
    getDataFromServer(COMMENTS_URL),
  ]);

  const dataPosts = posts.map((post: Post) => (
    {
      ...post,
      user: users.find((person: User) => (person.id === post.userId)),
      comments: comments.filter((comment: Comment) => (comment.postId === post.id)),
    }));

  return dataPosts;
}
