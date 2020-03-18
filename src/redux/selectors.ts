import { createSelector } from 'reselect';

export const preparePosts = (
  posts: PostInterface[],
  users: UserInterface[],
  comments: CommentInterface[],
): PreparedPostInterface[] => {
  return posts.map(post => ({
    ...post,
    user: users.find(user => user.id === post.userId) as UserInterface,
    comments: comments.filter(comment => comment.postId === post.id),
  }));
};

const selectPosts = (state: DataState) => state.posts;
const selectUsers = (state: DataState) => state.users;
const selectComments = (state: DataState) => state.comments;

export const selectTodosWithUser = createSelector(
  selectPosts,
  selectUsers,
  selectComments,
  (posts, users, comments) => {
    return users.length
      ? preparePosts(posts, users, comments)
      : [];
  },
);
