import { getPostComments } from '../api/comments';
import { getUserPosts } from '../api/posts';
import { getUsers } from '../api/users';

export const fetchUsers = async () => {
  return getUsers();
};

export const fetchUserPosts = async (userId: number) => {
  return getUserPosts(userId);
};

export const fetchPostComments = async (postId: number) => {
  return getPostComments(postId);
};
