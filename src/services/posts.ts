import { getPosts } from '../api/posts';
import { Post } from '../types/Post';

export const fetchPosts = () => {
  return new Promise<Post[]>((resolve) => {
    setTimeout(() => {
      resolve(getPosts());
    }, 2000);
  });
};
