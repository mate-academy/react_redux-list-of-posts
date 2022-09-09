export const BASE_URL = 'https://mate.academy/students-api/';
export const ENDPOINTS = {
  users: 'users',
  user: (id: number) => `users/${id}`,
  posts: 'posts',
  postsByUserId: (userId: number) => `posts?userId=${userId}`,
  comments: 'comments',
  commentsByPostId: (postId: number) => `comments?postId=${postId}`,
  commentsById: (id: number) => `comments/${id}`,
};
