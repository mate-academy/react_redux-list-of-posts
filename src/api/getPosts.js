const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

export const loadPostsFromServer = async() => {
  const response = await fetch(POSTS_URL);

  return response.json();
};
