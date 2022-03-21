// import { Post } from '../../react-app-env';
import { Post } from '../../react-app-env';
import { BASE_URL } from './api';

export async function getPosts(userId?: number): Promise<Post[]> {
  let posts;

  if (userId !== 0) {
    posts = await fetch(`${BASE_URL}/posts?userId=${userId}`);

    return posts.json();
  }

  posts = await fetch(`${BASE_URL}/posts`);

  return posts.json();
}

export const getPostDetails = async (postId: number) => {
  const res = await fetch(`${BASE_URL}/posts/${postId}`);

  return res.json();
};
