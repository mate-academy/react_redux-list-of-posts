import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export function fetchPosts(userId: number) {
  return new Promise<Post[]>(resolve => resolve(getUserPosts(userId)));
}
