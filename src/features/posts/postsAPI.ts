import { client } from '../../utils/fetchClient';
import { Post } from '../../types/Post';

export function fetchPosts(userID: number) {
  return client.get<Post[]>(`/posts?userId=${userID}`);
}
