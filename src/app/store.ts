import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { usersSlice } from '../features/usersSlice';
import { authorSLice } from '../features/authorSlice';
import { postsSlice } from '../features/postsSlice';
import { selectedPostSlice } from '../features/selectedPostSlice';
import { commentsSlice } from '../features/commentsSlice';
// eslint-disable-next-line import/no-cycle

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    author: authorSLice.reducer,
    posts: postsSlice.reducer,
    selectedPost: selectedPostSlice.reducer,
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
