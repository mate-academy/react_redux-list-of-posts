import {
  configureStore,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import usersSlice from '../features/users/usersSlice';
import postsSlice from '../features/posts/postsSlice';
import authorSlice from '../features/author/authorSlice';
import selectedPostSlice from '../features/selectedPost/selectedPostSlice';
import commentsSlice from '../features/commentsSlice/commentsSlice';

export const store = configureStore({
  reducer: {
    users: usersSlice,
    posts: postsSlice,
    author: authorSlice,
    selectedPost: selectedPostSlice,
    comments: commentsSlice,
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
