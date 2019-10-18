import { createSelector } from 'reselect';

const usersSelector = state => state.users;
const postsSelector = state => state.posts;
export const commentsSelector = state => state.comments;

export const selectPosts = createSelector(
  usersSelector,
  postsSelector,
  commentsSelector,
  (users, posts, comments) => posts.map(post => ({
    ...post,
    user: users.find(user => user.id === post.userId),
    comments: comments.filter(comment => comment.postId === post.id),
  }))
);
