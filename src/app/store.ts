import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
// import counterReducer from '../features/counter/counterSlice';
import { authorSlice } from '../features/authorSlice';
import { usersSlice } from '../features/usersSlice';
import { postsSlice } from '../features/postSlice';
import { selectedPostSlice } from '../features/selectedPostSlice';
import { commentSlice } from '../features/commentsSlice';

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    users: usersSlice.reducer,
    author: authorSlice.reducer,
    posts: postsSlice.reducer,
    selectedPost: selectedPostSlice.reducer,
    comments: commentSlice.reducer,
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
