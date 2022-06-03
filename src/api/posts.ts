const BASE_URL = 'https://mate.academy/students-api';

export async function getUserPosts(userId: number): Promise<Post[]> {
  let response;

  if (userId === 0) {
    response = await fetch(`${BASE_URL}/posts`);
  } else {
    response = await fetch(`${BASE_URL}/posts?userId=${userId}`);
  }

  return response.json();
}

export async function getPostDetails(postId: number | null): Promise<Post> {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);

  return response.json();
}

export function deletePost(postId: number) {
  fetch(`${BASE_URL}/posts/${postId}`, { method: 'DELETE' });
}
