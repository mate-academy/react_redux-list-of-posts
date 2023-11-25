import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { postsSlice } from '../features/postsSlice';
import { selectedPostSlice } from '../features/selectedPostSlice';
import { authorSlice } from '../features/authorSlice';
import { userSlice } from '../features/userSlice';
import { commentsSlice } from '../features/commentsSlice';

export const store = configureStore({
  reducer: {
    post: postsSlice.reducer,
    selectedPost: selectedPostSlice.reducer,
    author: authorSlice.reducer,
    users: userSlice.reducer,
    comments: commentsSlice.reducer,
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
