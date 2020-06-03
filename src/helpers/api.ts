const API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api';

async function getData(url: string) {
  const response = await fetch(url);
  const json = await response.json();

  return json;
}

export const getPreparedPosts = async (): Promise<PreparedPost[]> => {
  const [posts, users, comments] = await Promise.all([
    getData(`${API_URL}/posts.json`),
    getData(`${API_URL}/users.json`),
    getData(`${API_URL}/comments.json`),
  ]);

  const preparedPosts = posts.map((post: Post) => ({
    ...post,
    user: users.find((user: User) => user.id === post.userId),
    comments: comments.filter((comment: Comment) => comment.postId === post.id),
  }));

  return preparedPosts;
};


export function fetchMessage(): Promise<string> {
  // this is just a fake promise resolved in 2 seconds
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('Message from server');
    }, 2000);
  });
}
