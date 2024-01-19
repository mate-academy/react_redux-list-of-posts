import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import usersSliceReducer from '../features/users-slice';
import authorSliceReducer from '../features/author-slice';
import postsSliceReducer from '../features/posts-slice';
import selectedPostSliceReducer from '../features/selectedPost-slice';
import commentsSliceReducer from '../features/comments-slice';

export const store = configureStore({
  reducer: {
    users: usersSliceReducer,
    author: authorSliceReducer,
    posts: postsSliceReducer,
    selectedPost: selectedPostSliceReducer,
    comments: commentsSliceReducer,
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
