import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { usersSlice } from '../features/usersSlice';
import { authorSlice } from '../features/authorSlice';
import { postSlice } from '../features/postSlice';
import { commentsSlice } from '../features/commentsSlice';
import { selectedPostSlice } from '../features/selectedPostSlice';

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    author: authorSlice.reducer,
    posts: postSlice.reducer,
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
