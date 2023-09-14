import { getUserPosts } from '../../api/posts';

export function loadPostsByUserID(id: number) {
  return getUserPosts(id);
}
