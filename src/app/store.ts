import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { postsSlice } from '../features/counter/Slice/postsSlice';
import authorSlice from '../features/counter/Slice/authorSlice';
import { counterSlice } from '../features/counter/counterSlice';
import { selectedPostSlice } from '../features/counter/Slice/selectedPostSlice';
import { usersSlice } from '../features/counter/Slice/usersSlice';

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    counter: counterSlice.reducer,
    author: authorSlice,
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
