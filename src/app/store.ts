import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import { usersSlice } from '../api/users';
import { authorSlice } from '../api/author';
import { commentsSlice } from '../features/commentsSlice';
import { postsSlice } from '../features/postsSlice';
import { selectedPostSlice } from '../features/selectedPostSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersSlice.reducer,
    author: authorSlice.reducer,
    comments: commentsSlice.reducer,
    posts: postsSlice.reducer,
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
