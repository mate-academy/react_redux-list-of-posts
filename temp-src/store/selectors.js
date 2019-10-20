import { createSelector } from 'reselect';

export const postsSelect = state => state.posts;
const usersSelect = state => state.users;
const commentsSelect = state => state.comment;

export const postsSelector = createSelector(
  postsSelect,
  usersSelect,
  commentsSelect,
  (posts, users, comments) => posts.map(post => ({
    ...post,
    user: users.find(user => user.id === post.userId),
    comments: comments.filter(comment => comment.postId === post.id),
  }))
);
