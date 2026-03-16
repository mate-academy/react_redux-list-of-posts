import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';

export const getUserPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`).then(data => {
    if (!Array.isArray(data) && data?.statusCode >= 400) {
      throw new Error();
    }

    return data;
  });
};

export const getPosts = () => {
  return client.get<Post[]>('/posts');
};
