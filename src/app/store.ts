import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import { usersSlice } from '../features/users/usersSlice';
import { authorSlice } from '../features/author/authorSlice';
import { postsSlice } from '../features/posts/postsSlice';
import { selectedPostSlice } from '../features/selectedPost/selectedPostSlice';
import { commentsSlice } from '../features/comments/commentsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [usersSlice.name]: usersSlice.reducer,
    [authorSlice.name]: authorSlice.reducer,
    [postsSlice.name]: postsSlice.reducer,
    [selectedPostSlice.name]: selectedPostSlice.reducer,
    [commentsSlice.name]: commentsSlice.reducer,
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
