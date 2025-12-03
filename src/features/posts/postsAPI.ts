import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export const loadUserPosts = async (userId: number) => {
  const userPosts = await getUserPosts(userId).then((posts: Post[]) => {
    return posts;
  });

  return userPosts;
};
