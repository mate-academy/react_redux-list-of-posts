import { getUserPosts } from '../../api/posts';

export function fetchPosts(userId: number) {
  return getUserPosts(userId);
}
