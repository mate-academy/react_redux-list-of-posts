import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersStateReducer from '../features/usersSlice';
import postsStateReducer from '../features/postsSlice';
import commentsStateReducer from '../features/commentsSlice';
// eslint-disable-next-line import/no-cycle

export const store = configureStore({
  reducer: {
    usersState: usersStateReducer,
    postsState: postsStateReducer,
    commentsState: commentsStateReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

const getSelectedUser = (state: RootState) => {
  const { selectedUserId, users } = state.usersState;

  return users.find(user => user.id === selectedUserId) || null;
};

const getCurrentPost = (state: RootState) => {
  const { selectedPostId } = state.commentsState;
  const { posts } = state.postsState;

  return posts.find(post => post.id === selectedPostId);
};

export const selectors = {
  getUsers: (state: RootState) => state.usersState,
  getSelectedUser,
  getPosts: (state: RootState) => state.postsState,
  getCurrentPost,
  getCommentsInfo: (state: RootState) => state.commentsState,
};

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* eslint-enable @typescript-eslint/indent */
