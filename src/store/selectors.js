import { createSelector } from 'reselect';

export const getPosts = state => state.posts;
const getUsers = state => state.users;
const getComments = state => state.comments;

export const postsSelector = createSelector(
  getPosts,
  getUsers,
  getComments,
  (posts, users, comments) => posts.map(post => ({
    ...post,
    user: users.find(user => user.id === post.userId),
    comments: comments.filter(comment => comment.postId === post.id),
  }))
);
