import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import usersReducer from '../features/users/usersSlice';
// eslint-disable-next-line import/no-named-as-default, import/no-cycle
import authorSlice from '../features/author/authorSlice';
// eslint-disable-next-line import/no-named-as-default
import postsSlice from '../features/posts/postsSlice';
// eslint-disable-next-line import/no-named-as-default
import selectedPostSlice from '../features/selectedPost/selectedPostSlice';
// eslint-disable-next-line import/no-named-as-default
import commentsSlice from '../features/comments/commentsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
    author: authorSlice,
    posts: postsSlice,
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
