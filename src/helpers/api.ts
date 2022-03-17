const BASE_URL = 'https://mate.academy/students-api';

export async function fetchPosts() {
  const response = await fetch(`${BASE_URL}/posts`);

  return response.json();
}

export async function getUserPosts(userId: number) {
  const response = await fetch(`${BASE_URL}/posts/${userId}`);

  return response.json();
}

export function fetchMessage(): Promise<string> {
  // this is just a fake promise resolved in 2 seconds
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('Message from server');
    }, 2000);
  });
}
