import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReducer, { selectors as usersSelectors } from './usersSlice';
import postsReducer, { selectors as postsSelectors } from './postsSlice';
import commentsReducer,
{ selectors as commentsSelectors } from './commentsSlice';
// eslint-disable-next-line import/no-cycle

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* eslint-enable @typescript-eslint/indent */

export const selectors = {
  getSelectedUser: (state: RootState) => usersSelectors
    .getSelectedUser(state.users),

  getUsersState: (state: RootState) => state.users,

  getUsers: (state: RootState) => usersSelectors
    .getUsers(state.users),

  getPosts: (state: RootState) => postsSelectors
    .getPosts(state.posts),

  getPostsState: (state: RootState) => postsSelectors
    .getPostsState(state.posts),

  getSelectedPost: (state: RootState) => postsSelectors.getPosts(state.posts)
    .find(({ id }) => id === commentsSelectors
      .getSelectedPostId(state.comments)) || null,

  getSelectedPostId: (state: RootState) => commentsSelectors
    .getSelectedPostId(state.comments),

  getCommentsState: (state: RootState) => state.comments,

  getSubmitting: (state: RootState) => commentsSelectors
    .getSubmiting(state.comments),
};
