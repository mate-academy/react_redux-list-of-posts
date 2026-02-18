import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import { selectedPostSlice } from '../features/selectedPost';
import { usersSlice } from '../features/users';
import { postsSlice } from '../features/posts';
import { authorSlice } from '../features/author';
import { commentsSlice } from '../features/comments';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersSlice.reducer,
    posts: postsSlice.reducer,
    author: authorSlice.reducer,
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
