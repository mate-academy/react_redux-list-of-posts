const API_POSTS = 'https://mate.academy/students-api/posts/';

export async function getPosts() {
  const response = await fetch(API_POSTS);

  return response.json();
}

export async function getPost(postId: number) {
  const response = await fetch(`${API_POSTS}${postId}`);

  return response.json();
}
