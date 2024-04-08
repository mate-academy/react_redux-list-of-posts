import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export function fetchPosts(userId: number) {
  return new Promise<Post[]>((resolve, reject) => {
    try {
      const posts = getUserPosts(userId);

      resolve(posts);
    } catch (error) {
      reject(error);
    }
  });
}
