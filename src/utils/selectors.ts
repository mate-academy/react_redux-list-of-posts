import { RootState } from '../app/store';

export const selectedUserSelector = (state: RootState) => {
  const { selectedUserId, users } = state.usersState;

  return users.find(user => user.id === selectedUserId);
};

export const currentPostSelector = (state: RootState) => {
  const { currentPostId } = state.currentPostState;
  const { posts } = state.postsState;

  return posts.find(post => post.id === currentPostId);
};
