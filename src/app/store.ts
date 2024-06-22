import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import usersReducer from '../features/users';
import comentsReducer from '../features/coments';
import postsReducer from '../features/posts';
import selectedPostReducer from '../features/selectedPost';
import authorReducer from '../features/author';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
    comments: comentsReducer,
    posts: postsReducer,
    selectedPost: selectedPostReducer,
    author: authorReducer,
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
