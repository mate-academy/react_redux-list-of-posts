import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import { postsSlice } from '../features/posts/postsSlice';
import { commentsSlice } from '../features/comments/commentsSlice';
import { usersSlice } from '../features/users/usersSlice';
import { authorSlice } from '../features/author/authorSlice';
import { selectedPostSlice } from '../features/selectedPost/selectedPostSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersSlice.reducer,
    posts: postsSlice.reducer,
    comments: commentsSlice.reducer,
    author: authorSlice.reducer,
    selectedPost: selectedPostSlice.reducer,
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
