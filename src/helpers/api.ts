export const BASE_URL = 'https://mate.academy/students-api';

export const fetchSelectedPost = async (selectedPostId: number) => {
  const response = await fetch(`${BASE_URL}/posts/${selectedPostId}`);

  return response.json();
};
