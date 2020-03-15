import { loadPosts, loadUsers, loadComments } from './api';
import {
  User,
  Post,
  Comment,
  FullPost,
} from '../constants/types';

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

export const getVisiblePosts = (
  posts: FullPost[],
  query: string,
): FullPost[] => {
  return posts.filter(post => {
    return (
      post.title.toLowerCase().includes(query.toLowerCase())
      || post.body.toLowerCase().includes(query.toLowerCase())
    );
  });
};
