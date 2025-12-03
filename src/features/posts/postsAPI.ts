import { getUserPosts } from '../../api/posts';

export const loadUserPosts = async (userId: number) => {
  const userPosts = await getUserPosts(userId);

  return userPosts;
};
