import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import { usersReducer } from '../features/userSlice';
import { postsSlice } from '../features/postsSlice';
import { commentsSlice } from '../features/commentsSlice';
import { authorReducer } from '../features/authorSlice';
import { selectedPostReducer } from '../features/selectedPostSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
    posts: postsSlice.reducer,
    comments: commentsSlice.reducer,
    author: authorReducer,
    selectedPost: selectedPostReducer,
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
