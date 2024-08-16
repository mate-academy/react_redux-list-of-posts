import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import { usersSlice } from './features/usersSlice';
import { authorSlice } from './features/authorSlice';
import { postsSlise } from './features/postsSlice';
import { selectedPostSlice } from './features/selectedPostSlice';
import { commentsSlice } from './features/commentsSlice';

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    author: authorSlice.reducer,
    posts: postsSlise.reducer,
    selectedPost: selectedPostSlice.reducer,
    comments: commentsSlice.reducer,
    counter: counterReducer,
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
