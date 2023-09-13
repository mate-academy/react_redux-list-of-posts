import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';

export const getPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

// export const getPosts = () => {
//   return client.get<Post[]>('/posts');
// };

export const getPost = (postId: number) => {
  return client.get<Post>(`/posts/${postId}`);
};
