/* eslint-disable import/no-cycle */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReduser from '../features/usersSlice';
import postsReduser from '../features/postsSlice';
import selectedPostReducer from '../features/selectedPostSlice';
import authorReducer from '../features/authorSlice';
import commentsReduser from '../features/commentsSlice';

export const store = configureStore({
  reducer: {
    users: usersReduser,
    posts: postsReduser,
    selectedPost: selectedPostReducer,
    author: authorReducer,
    comments: commentsReduser,
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
