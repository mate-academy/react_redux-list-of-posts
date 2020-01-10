const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';

export const loadCommentsFromServer = async() => {
  const response = await fetch(COMMENTS_URL);

  return response.json();
};
