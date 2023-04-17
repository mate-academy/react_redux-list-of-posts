import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import authorReducer from '../features/author/authorSlice';
// eslint-disable-next-line import/no-cycle
import postsReducer from '../features/posts/postsSlice';
// eslint-disable-next-line import/no-cycle
import commentsReducer from '../features/comments/commentsSlice';

export const store = configureStore({
  reducer: {
    author: authorReducer,
    post: postsReducer,
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
