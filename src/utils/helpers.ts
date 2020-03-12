import { loadPosts, loadUsers, loadComments } from './api';
import { User, Post, Comment } from '../constants/types';

export const getPosts = async () => {
  const [initialPosts, initialUsers, initialComments] = await Promise.all([
    loadPosts(),
    loadUsers(),
    loadComments(),
  ]);

  const posts = initialPosts.map((post: Post) => {
    return {
      ...post,
      user: initialUsers.find(
        (user: User) => user.id === post.userId,
      ) as User,
      comments: initialComments.filter(
        (comment: Comment) => comment.postId === post.id,
      ),
    };
  });

  return posts;
};
