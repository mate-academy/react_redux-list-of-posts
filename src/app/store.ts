// eslint-disable-next-line import/no-cycle

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { userSlice } from '../features/user/userSlice';
import { postsSlice } from '../features/user/postsSlice';
import { selectedPostSlice } from '../features/user/selectedPost';
import { authorSlice } from '../features/user/authorSlice';
import commentsReducer from '../features/user/commentSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: userSlice.reducer,
    posts: postsSlice.reducer,
    comments: commentsReducer,
    selectedPost: selectedPostSlice.reducer,
    author: authorSlice.reducer,
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
