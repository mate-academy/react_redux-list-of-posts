import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import { usersSlice } from '../features/slices/usersSlice';
import { postSlice } from '../features/slices/postSlice';
import { authorSlice } from '../features/slices/authorSlice';
import { selectedPostSlice } from '../features/slices/selectedPostSlice';
import { commentsSlice } from '../features/slices/commentsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersSlice.reducer,
    posts: postSlice.reducer,
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
